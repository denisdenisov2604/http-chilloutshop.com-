@echo off
REM Удалить .git из папки public, если он есть
IF EXIST public\.git (
    echo Удаление .git из папки public...
    rd /s /q public\.git
)

REM Инициализация репозитория (если ещё не инициализирован)
IF NOT EXIST .git (
    git init
)

REM Добавление всех файлов
git add .

REM Коммит
git commit -m "Deploy update"

REM Пуш в репозиторий
git push -u origin main

pause
