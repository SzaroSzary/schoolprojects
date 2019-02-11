#include <iostream>
#include <math.h>

double f (double x)
{
	return pow((x-5),3)+2;
}
double bisekcja(double a, double b, double epsilon)
{
	double x = f((a+b)/2);
	while (fabs(a-b)>epsilon)
	{
		if(f(x)*f(a)<0)
			b=x;
		else if(f(x)*f(b)<0)
			a=x;
		x=(a+b)/2;
	}
	return (a+b)/2;
}

void prep_bisekcja(double a, double b, double epsilon)
{
	if(f(a)*f(b)> 0)
		std::cout << "Miejsce zerowe nie istnieje w tym przedziale.";
	else if(f(a) == 0)
		std::cout << "Miejsce zerowe jest rowne "<<a;
	else if(f(b) == 0)
		std::cout << "Miejsce zerowe jest rowne " << b;
	else if(f((a+b)/2)==0)
		std::cout << "Miejsce zerowe jest rowne " << ((a+b)/2);
	else
	    std::cout << "Wynik to: " <<bisekcja(a, b, epsilon)<< "\n";
	return;
}

int main()
{
	double epsilon, a, b;
    std::cout << "Podaj poczatek przedzialu: ";
    std::cin >> a;
    std::cout << "Podaj koniec przedzialu: ";
    std::cin >> b;
    std::cout << "Podaj dokladnosc: ";
    std::cin >> epsilon;
    prep_bisekcja(a, b, epsilon);
    system("pause");
    return 0;
}
