#include <iostream>

int main()
{
	int *pierw;
    int il;
    std::cout << "Podaj ilosc pierwiastkow: ";
    std::cin >> il;
    pierw = new int [il];
    int x, licz=0;
	std::cout << "Podaj pierwiastki: ";
	for(int i = 0;i<il;i++)
	{
		std::cin>> x;
		pierw[i]=x;	
	}
	int wyntab[il+1];
	wyntab[0] =1;
	for(int i = 1;i<=il;i++)
	{
		wyntab[i]=0;
	}
	for(int i=0;i<il;i++)
	{
		for(int j=il;j>=0;j--)
		{
			wyntab[j] = wyntab[j] -(pierw[i]*wyntab[j-1]);
		}
	}
	for(int i=0;i<il+1;i++)
	{
		std::cout<<wyntab[i] << " ";
	}
    system("pause");
    return 0;
}
