#include <iostream>

int main()
{
	std::string line = "";
	int length = 0;
	std::cout << "Expression length: ";
	std::cin >> length;
	std::string expressions[length], expressionslength[length];
	for(int i = 0;i<length;i++)
	{
		std::cout<<"Expression " << i+1 << ": ";
		std::cin>>expressions[i];
		std::cin>>expressionslength[i];
	}
    system("pause");
    return 0;
}
