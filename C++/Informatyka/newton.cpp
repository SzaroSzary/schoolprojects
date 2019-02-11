#include <iostream>
#include <math.h>

float newton(int x, float eps)
{
	float p = x/2;
	while(fabs(x/p-p)>eps)
	{
		p = (x/p+p)/2;
	}
	return p;
}

int main()
{
	int x;
	float eps;
	std::cout << "Podaj liczbe, ktorej pierwiastka szukasz: ";
	std::cin >> x;
	std::cout << "Podaj przyblizenie: ";
	std::cin >> eps;
	std::cout <<"Szukany pierwiastek to w przyblizeniu: " << newton(x, eps)<<"\n";
    system("pause");
    return 0;
}
