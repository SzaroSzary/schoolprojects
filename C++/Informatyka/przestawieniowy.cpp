#include <iostream>
#include <fstream>
#include <string>

std::ifstream in;
std::ofstream out;

int main()
{
	std::string szyfry[6];
	int klucz[50];
	in.open("szyfr1.txt");
	if(in.good())
	{
		for(int i = 0; i < 6; ++i)
        {
            in >> szyfry[i];
        }
		for(int i = 0; i < 50; ++i)
        {
            in >> klucz[i];
        }
		in.close();
	}
	for(int i=0;i<6;i++)
	{
		std::string temp = szyfry[i];
		for(int j=0;j<50;j++)
		{
			std::swap(temp[j],temp[klucz[j]-1]);
			/*char temp;
			temp = szyfry[i][j];
			szyfry[i][j] = szyfry[i][klucz[j]];
			szyfry[i][klucz[j]] = temp;*/
		}
		szyfry[i] = temp;
	}
	for(int i=0;i<6;i++)
	{
		std::cout<<szyfry[i]<<'\n';
	}
	system("pause");
	return 0;
}
