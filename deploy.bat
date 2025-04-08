@echo off
echo Добавление изменений в git...
git add .

echo Коммит изменений...
git commit -m "Автоматический деплой"

echo Отправка в репозиторий...
git push origin master

echo Деплой завершен.
pause
