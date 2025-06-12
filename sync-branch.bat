@echo off
if "%1"=="" (echo Error: Please specify a branch name & exit /b 1)
git checkout %1 && git pull origin %1 || echo Failed to sync branch %1