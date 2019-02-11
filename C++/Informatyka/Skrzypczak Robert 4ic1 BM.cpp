#include <iostream>
#include <string>

int main()
{
	std::string wzorzec, tekst;
	std::cout << "Podaj tekst: ";
	getline(std::cin, tekst);
	std::cout << "Podaj wzorzec: ";
	getline(std::cin, wzorzec);
	int M = wzorzec.length(), N = tekst.length();
	if(M>N)
	{
		std::cout << "Brak wystapien.";
		system("pause");
		return 0;
	}
	int shift[128];
	for(int i=0;i<128;i++)
	{
		shift[i]=M;
	}
	for(int i=M-1;i>=0;i--)
	{
		if(shift[wzorzec[i]]>=M)
		{
			shift[wzorzec[i]]=M-1-i;
		}
	}
	int i=M-1, j=M-1;
	while(i<N)
	{
		while(j>0)
		{
			while(tekst[i]!=wzorzec[j])
			{
				int x = shift[tekst[i]];
				if(M-j>x)
				{
					i+=M-j;
				}
				else
				{
					i+=x;
				}
				if(i>N)
				{
					std::cout << "Brak wystapien.";
					system("pause");
					return 0;
				}
				j = M-1;
			}
			i--;
			j--;
		}
		std::cout << "Odnaleziono wzorzec na pozycji " << i << '\n';
		j= M-1;
		i+=M+1;
	}
	system("pause");
	return 0;
}
