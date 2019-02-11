#include <iostream>
#include <math.h>

double f (double x)
{
	//return pow(x,3)+x-3;
	return cos(x)+(1/(x+2));
	//return pow((x-5),3)+2;
}

double fp(double x)
{
	return -1/pow((2+x),2) - sin(x);
	//return 1 + 3*pow(x,2); 
}

double falsi(double a, double b, double epsilon)
{
	double x, y;
	int licznik = 0;
	do
	{
		y = x;
		x= x - f(x)/fp(x);
		b=a;
		a=x;
		licznik++;
	}
	while (fabs(x-y)>epsilon && licznik<100);
	return x;
}

void prep_falsi(double a, double b, double epsilon)
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
	    std::cout << "Wynik to: " <<falsi(a, b, epsilon)<< "\n";
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
    prep_falsi(a, b, epsilon);
    system("pause");
    return 0;
}
