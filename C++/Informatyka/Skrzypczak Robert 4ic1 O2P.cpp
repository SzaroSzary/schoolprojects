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
	std::cin >> length;
	//length++;
	std::string linetab[length];
	std::string score = "";
	int expressionlength[length];
	for(int i=0;i<length;i++)
	{
		std::cin >> expressionlength[i];
		std::getline(std::cin, linetab[i], '\n');
	}
	for(int i=0;i<length;i++)
	{
		for(int j=expressionlength[i];j>0;j--)
		{
			char c = linetab[i][j];
			char last;
			bool checkspace = false;
			std::string temp;
			switch(c)
			{
				case '+':
				case '-':
				case '*':
				case '/':
				case '^':
					if(stack.size()!=0)
					{
						if(weight(c)==3||weight(c)>=weight(stack.top()))
						{
							if(weight(c)>=weight(last))
							{
								stack.push('(');
							}
							stack.push(c);
						}
					}
					else if(stack.size()==0)
					{
						stack.push(c);
					}
					break;
				default:
					if(last=='+'||last=='-'||last=='*'||last=='/'||last=='^')
					{
						temp = c;
						score.insert(0,")");
						score.insert(0,temp);
					}
					else
					{
						if(last == ' ')
						{
							checkspace = true;
						}
						else
						{
							checkspace = false;
						}
						if(checkspace)
						{	
							temp = stack.top();
							score.insert(0,temp);
							stack.pop();
							temp = c;
							score.insert(0,temp);
							checkspace = false;
						}
						else
						{
							if(c != ' ')
							{
								temp = c;
								score.insert(0,temp);
							}
							else if(stack.size()!=0 && stack.top()=='(')
							{
								temp = stack.top();
								score.insert(0,temp);
								stack.pop();
							}
						}
					}
					break;
			}
			last = c;
		}
		std::cout<<score<<'\n';
		score = "";
	}
    system("pause");
    return 0;
}
