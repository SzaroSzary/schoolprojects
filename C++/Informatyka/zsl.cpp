#include <iostream>

int* toanother(int ilecyfr, int wynikdec,int systemin, int systemout)
{
	int wyniktemp[100], *wynik, i=0;
	while(wynikdec>=1)
	{
		wyniktemp[i]=wynikdec%systemout;
		wynikdec = (wynikdec-wyniktemp[i])/2;
		i++;
	}
	wynik = new int [i];
	for (int j=0, k=i-1;j<i;j++,k--)
	{
		wynik[j]=wyniktemp[k];
	}
	return wynik;
}

int* todec(int ilecyfr, int liczba[], int systemin, int systemout)
{
	int wynikdec;
	for (int i = 0;i<ilecyfr;i++)
	{
		wynikdec = wynikdec*systemin + liczba[i]; 
	}
	return toanother(ilecyfr, wynikdec, systemin, systemout);
}

int main()
{
	int *liczba;
    int ilecyfr, systemin, systemout;
    std::cout << "Podaj ilosc cyfr: ";
    std::cin >> ilecyfr;
    std::cout << "Podaj wejsciowy system liczbowy: ";
    std::cin >> systemin;
    std::cout << "Podaj docelowy system liczbowy: ";
    std::cin >> systemout;
    liczba = new int [ilecyfr];
    for(int i = ilecyfr, j = 0; i> 0;i--, j++)
	{	
	    std::cout << "Podaj kolejna cyfre: ";
	    std::cin >> liczba[j];
	}
	int *tabwynikowa = todec(ilecyfr, liczba, systemin, systemout);
	if(systemout == 10)
    	std::cout << "Wynik to: " <<tabwynikowa<< "\n";
    else
	{
		std::cout << "Wynik to: ";
		for(int j=0;j<sizeof(tabwynikowa);j++)
		{
			std::cout << tabwynikowa[j];
		}
	}
    system("pause");
    return 0;
}
