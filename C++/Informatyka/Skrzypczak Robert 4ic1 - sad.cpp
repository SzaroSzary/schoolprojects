#include <iostream>
#include <string>

int main()
{
	int licz_dni, licz_pyt;
	std::cin >> licz_dni;
	int wis_dzien[licz_dni+1];
	for(int i=0;i<licz_dni;i++)
	{
		std::cin >> wis_dzien[i];
	}
	wis_dzien[licz_dni] = 0;
	std::cin >> licz_pyt;
	int dzien_pocz[licz_pyt], dzien_kon[licz_pyt];
	for(int i=0;i<licz_pyt;i++)
	{
		std::cin >> dzien_pocz[i];
		std::cin >> dzien_kon[i];
	}
	for(int i=0;i<licz_pyt;i++)
	{
		int sum1 = 0, sum2 = 0;
		for(int j=0;j<=dzien_pocz[i]-2;j++)
		{
			sum1+=wis_dzien[j];
		}
		for(int j=0;j<=dzien_kon[i]-1;j++)
		{
			sum2+=wis_dzien[j];
		}
		int wynik = sum2 - sum1;
		std::cout << wynik << '\n';
	}
	system("pause");
	return 0;
}
