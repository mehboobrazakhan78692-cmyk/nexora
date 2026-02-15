const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const BACKEND_DIR = path.join(ROOT_DIR, 'backend');
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, cwd, onError) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd, stdio: 'inherit' }, (error, stdout, stderr) => {
      if (error) {
        if (onError) onError(error);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function installDependencies() {
  log('\n📦 Installing dependencies...', 'cyan');

  // Install root dependencies
  log('Installing root dependencies...', 'yellow');
  try {
    await runCommand('npm install', ROOT_DIR);
  } catch (error) {
    log('Failed to install root dependencies', 'red');
  }

  // Install backend dependencies
  log('Installing backend dependencies...', 'yellow');
  try {
    await runCommand('npm install', BACKEND_DIR);
  } catch (error) {
    log('Failed to install backend dependencies', 'red');
  }

  // Install frontend dependencies
  log('Installing frontend dependencies...', 'yellow');
  try {
    await runCommand('npm install', FRONTEND_DIR);
  } catch (error) {
    log('Failed to install frontend dependencies', 'red');
  }

  log('✅ Dependencies installed successfully', 'green');
}

async function runMigrations() {
  log('\n🔄 Running database migrations...', 'cyan');
  
  try {
    await runCommand('npx prisma generate', BACKEND_DIR);
    await runCommand('npx prisma migrate dev --name init', BACKEND_DIR);
    log('✅ Database migrations completed', 'green');
  } catch (error) {
    log('⚠️ Migration might have already been run or failed', 'yellow');
  }
}

function startBackend() {
  log('\n🚀 Starting backend server...', 'cyan');
  
  const backendProcess = spawn('npm', ['run', 'dev'], {
    cwd: BACKEND_DIR,
    stdio: 'pipe',
    shell: true
  });

  backendProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`${colors.cyan}[Backend]${colors.reset} ${output}`);
    if (output.includes('Server running on port')) {
      log('✅ Backend server started successfully', 'green');
    }
  });

  backendProcess.stderr.on('data', (data) => {
    console.log(`${colors.red}[Backend Error]${colors.reset} ${data.toString()}`);
  });

  backendProcess.on('error', (error) => {
    log(`❌ Failed to start backend: ${error.message}`, 'red');
  });

  return backendProcess;
}

function startFrontend() {
  log('\n🌐 Starting frontend server...', 'cyan');
  
  const frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: FRONTEND_DIR,
    stdio: 'pipe',
    shell: true
  });

  frontendProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`${colors.cyan}[Frontend]${colors.reset} ${output}`);
    if (output.includes('Ready in') || output.includes('started server')) {
      log('✅ Frontend server started successfully', 'green');
    }
  });

  frontendProcess.stderr.on('data', (data) => {
    console.log(`${colors.cyan}[Frontend]${colors.reset} ${data.toString()}`);
  });

  frontendProcess.on('error', (error) => {
    log(`❌ Failed to start frontend: ${error.message}`, 'red');
  });

  return frontendProcess;
}

async function main() {
  log(`${colors.bright}========================================${colors.reset}`, 'cyan');
  log(`${colors.bright}  NEXORA - Full Stack Application${colors.reset}`, 'cyan');
  log(`${colors.bright}========================================${colors.reset}`, 'cyan');

  try {
    // Step 1: Install dependencies
    await installDependencies();

    // Step 2: Run migrations
    await runMigrations();

    // Step 3: Start backend
    const backendProcess = startBackend();

    // Wait a bit for backend to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 4: Start frontend
    const frontendProcess = startFrontend();

    // Print success message
    log('\n========================================', 'green');
    log('🎉 NEXORA is now running!', 'green');
    log('========================================', 'green');
    log('\n📱 Frontend: http://localhost:3000', 'cyan');
    log('🔧 Backend:  http://localhost:5000', 'cyan');
    log('\nPress Ctrl+C to stop all servers', 'yellow');
    log('========================================\n', 'green');

    // Handle process termination
    process.on('SIGINT', () => {
      log('\n\n🛑 Shutting down servers...', 'yellow');
      backendProcess.kill();
      frontendProcess.kill();
      process.exit(0);
    });

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
