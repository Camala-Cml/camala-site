@echo off
cd /d "%~dp0"
echo Publicando as atualizacoes do site...
echo.
git add -A
git commit -m "Atualizacao do site"
git push
echo.
echo Pronto! Se nao apareceu nenhum erro em vermelho acima, o site ja foi atualizado.
pause
