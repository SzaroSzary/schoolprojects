#include <iostream>

int mnozenie(int wykladnik, int podstawa)
{
	int wynik = 1;
	if(wykladnik==0)
		return 1;
	while(wykladnik>=1)
	{
		if(wykladnik%2==1)
		{
			wynik *=podstawa;
		}
		podstawa*=podstawa;
		wykladnik = (wykladnik-wykladnik%2)/2;
	}
	return wynik;
}

int rekurencja(int wykladnik, int podstawa)
{
	int wynik;
	if(wykladnik==0)
		return 1;
	if(wykladnik%2==1)
		return podstawa * rekurencja(wykladnik-1, podstawa);
	wynik = rekurencja(wykladnik/2, podstawa);
	return wynik*wynik;
}

int main()
{
    int podstawa, wykladnik;
    std::cout << "Podaj podstawe: ";
    std::cin >> podstawa;
    std::cout << "Podaj wykladnik: ";
    std::cin >> wykladnik;
    std::cout << "Wynik to: " <<rekurencja(wykladnik, podstawa)<< "\n";
    system("pause");
    return 0;
}
