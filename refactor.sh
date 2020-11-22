for file in clientv2/**/**/**/**/**.js
do
  mv "$file" "${file%.js}.tsx"
done