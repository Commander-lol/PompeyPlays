ps -aux | grep redis | head -1 | tr -s ' ' | cut -d ' ' -f 2 | xargs kill $1
