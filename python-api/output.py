import sys

def add(num1,num2):
  return num1+num2
	#type code here

if __name__ == "__main__":
	a = int(sys.argv[1])
	b = int(sys.argv[2])
	correct = int(sys.argv[3])
	print(add(a, b) == correct)
	print(add(a, b))