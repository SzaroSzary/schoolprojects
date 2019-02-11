#include <iostream>

int horner(int il, int wsp[], int arg)
{
	int wyn;
	for (int i = 0;i<=il;i++)
	{
		wyn = wyn*arg + wsp[i]; 
	}
	return wyn;
}

int main()
{
	int *wsp;
    int il, arg;
    std::cout << "Podaj ilosc wspolczynnikow: ";
    std::cin >> il;
    wsp = new int [il+1];
    for(int i = il, j = 0; i>= 0;i--, j++)
	{	
	    std::cout << "Podaj wspolczynnik przy " << i << " potedze:";
	    std::cin >> wsp[j];
	}
    std::cout << "Podaj argument: ";
    std::cin >> arg;
    std::cout << "Wynik to: " <<horner(il, wsp, arg)<< "\n";
    system("pause");
    return 0;
}
