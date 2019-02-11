#include <iostream>
#include <fstream>
#include <string>

std::ifstream in;
std::ofstream out;

int main()
{
	std::string szyfry1[6], szyfry2, szyfry3;
	int klucz1[50], klucz2[15], klucz3[6] = {6,2,4,1,5,3};
	in.open("szyfr1.txt");
	if(in.good())
	{
		for(int i = 0; i < 6; ++i)
        {
            in >> szyfry1[i];
        }
		for(int i = 0; i < 50; ++i)
        {
            in >> klucz1[i];
        }
		in.close();
	}
	for(int i=0;i<6;i++)
	{
		std::string temp = szyfry1[i];
		for(int j=0;j<50;j++)
		{
			std::swap(temp[j],temp[klucz1[j]-1]);
		}
		szyfry1[i] = temp;
	}
	in.open("szyfr2.txt");
	if(in.good())
	{
        in >> szyfry2;
		for(int i = 0; i < 50; ++i)
        {
            in >> klucz2[i];
        }
		in.close();
	}
	for(int i=0,j=0;i<50;i++,j++)
	{
		if(j==15)
		{
			j=0;
		}
		std::swap(szyfry2[i],szyfry2[klucz2[j]-1]);
	}
	in.open("szyfr3.txt");
	if(in.good())
	{
        in >> szyfry3;
		in.close();
	}
	for(int i=49,j=i%6;i>=0;i--,j--)
	{
		std::swap(szyfry3[i],szyfry3[klucz3[j]-1]);
		if(j==0)
		{
			j=6;
		}
	}
	std::string wynik1, wynik2, wynik3;
	for(int i=0;i<6;i++)
	{
		wynik1+=szyfry1[i]+'\n';
	}
	wynik2 = szyfry2;
	wynik3 = szyfry3;
	out.open("wyniki_szyfr1.txt");
	if(out.good())
	{
		out << "76.1\n\n" << wynik1 << "\n";
		out.close();
	}
	out.open("wyniki_szyfr2.txt");
	if(out.good())
	{
		out << "76.2\n\n" << wynik2 << "\n";
		out.close();
	}
	out.open("wyniki_szyfr3.txt");
	if(out.good())
	{
		out << "76.3\n\n" << wynik3 << "\n";
		out.close();
	}
	system("pause");
	return 0;
}
