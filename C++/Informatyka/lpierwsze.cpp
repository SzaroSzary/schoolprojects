#include <iostream>

bool czypierwsza(int x)
{
    for(int i = 2;i*i<x;++i)
    {
        if(x%i==0)
            return false;
    }
    return true;
}

void rozklad(int x)
{
	int i = 2;
	std::cout<<"Czynniki liczby " << x << " to:";
	while(x/i!=1)
	{
		if(x%i==0)
		{
			x/=i;
			std::cout<<i<<" ";
		}
		else
		{
			if(i==x)
				return;
			++i;
		}
	}
	std::cout<<x;
}

bool doskonale(int x)
{
	int ret;
	for(int i = 1;i<x;i++)
	{
		if(x%i==0)
		{
			ret+=i;
		}
	}
	if(ret == x)
		return true;
	return false;
}

int main()
{
    int x;
    std::cout << "Podaj liczbe: ";
    std::cin >> x;
    /*if(x<2)
    {
        std::cout << "Podana liczba nie jest pierwsza.";
        system("pause");
        return 0;
    }
    if(czypierwsza(x))
    {
        std::cout << "Podana liczba jest pierwsza.";
        system("pause");
        return 0;
    }
    std::cout << "Podana liczba nie jest pierwsza.";
    rozklad(x);
    bool val = doskonale(x);
    if(val)
	{
		std::cout << "Liczba jest doskonala.";
	}
	else
	{
		std::cout << "Liczba nie jest doskonala.";
	}
    */
    system("pause");
    return 0;
}
