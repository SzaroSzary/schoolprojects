#include <iostream>
#include <string>
#include <fstream>
#include <algorithm>

std::ifstream in;
std::ofstream out;

int main()
{
	int a[1000], b[1000], anagramy = 0;
	std::string c[2000];
	in.open("dane_anagramy.txt");
	if(in.good())
	{
		int i = 0;
    	while(!in.eof())
    	{
    		in >> a[i] >> b[i];
    		i++;
		}
		in.close();
	}
	for(int i = 0,k=0;i<1000;i++,k++)
	{
		int tempa[7], tempb[7], aval = a[i], bval = b[i];
		for(int j=0;j<7;j++)
		{
			tempa[j] = aval%10;
			tempb[j] = bval%10;
			aval/=10;
			bval/=10;
		}
		std::sort(tempa, tempa+7);
		std::sort(tempb, tempb+7);
		bool ok = true;
		for(int j=0;j<7;j++)
		{
			if(tempa[j] != tempb[j])
			{
				ok = false;
				break;
			}
		}
		if(ok)
		{
			anagramy++;
		}
	}
	/*int c[2000];
	for(int i=0;i<1000;i++)
	{
		c[i] = a[i];
	}
	for(int i=1000, j=0;i<2000;i++,j++)
	{
		c[i] = b[j];
	}
	std::sort(c, c+2000);
	for(int i = 0;i<2000;i++)
	{
		std::cout << c[i] << "\n";
	}*/
	/*for(int i=0;i<2000;i++)
	{
		std::cout << c[i] << "\n";
	}*/
	std::cout << anagramy << "\n";
	system("pause");
	return 0;
}
