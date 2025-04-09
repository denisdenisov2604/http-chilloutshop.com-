@echo off
REM Проверяем, что мы находимся в корневой папке проекта
IF NOT EXIST .git (
  echo Git repository not found in this folder!
  pause
  exit /b
)

echo Добавление изменений в Git...
git add .

echo Создание коммита...
git commit -m "Deploy update"

echo Отправка изменений в репозиторий...
git push -u origin master

echo.
echo --- Деплой завершен! ---
pause
