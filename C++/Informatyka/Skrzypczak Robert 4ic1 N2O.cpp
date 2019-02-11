#include <iostream>
#include <stack>
#include <string>

int weight(char c)
{
	switch(c)
	{
		case '+':
		case '-': 
			return 1;
		case '*':
		case '/': 
			return 2;
		case '^': 
			return 3;
	}
	return 0;
}

int main()
{
	std::string line = "";
	int length = 0;
	std::stack<char> stack;
	//std::cout << "Expression length: ";
	std::cin >> length;
	std::string expressions[length];
	int expressionslength[length];
	for(int i = 0;i<length;i++)
	{
		//std::cout<<"Expression " << i+1 << ": ";
		std::cin>>expressionslength[i];
		std::cin>>expressions[i];
	}
	for(int i=0;i<length;i++)
	{
		for(int j=0;j<expressionslength[i];j++) 
		{ 
			char c = expressions[i][j];
			switch(c)
			{
				case ' ': 
					break;
				case '(': 
					stack.push('(');
					break;
				case ')':
					while(stack.top()!='(')
					{
						std::cout <<stack.top();
						stack.pop();
					}
					stack.pop();
					break;
				case '+':
				case '-':
				case '*':
				case '/':
				case '^':
					while(stack.size())
					{
						if(weight(c)==3 || weight(c)>weight(stack.top()))
						{
							break;
						}
						std::cout<<stack.top();
						stack.pop();
					}
					stack.push(c);
					std::cout<<' ';
					break;
				default:
					std::cout << c;
					break;
			}
		}
		while(stack.size()>0)
		{
			std::cout <<stack.top();
			stack.pop();
		}
		std::cout<<'\n';
	}
    system("pause");
    return 0;
}
