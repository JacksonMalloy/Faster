for file in client/**/**/**/**.js.tsx
do
  mv "$file" "${file%.js.tsx}.tsx"
done