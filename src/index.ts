export default function greeter(name: string): string {
  console.log('Very important work.');
  return `Hello, ${name}!`;
}

console.log(greeter('potato'));
