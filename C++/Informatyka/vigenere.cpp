#include <iostream>
#include <fstream>
#include <string>

std::ifstream in;
std::ofstream out;

char **base(int size)
{
	int start = 97, end=123;
	char **base = 0;
	base = new char*[size];
	for(int i=0;i<size;i++)
	{
		base[i] = new char[size];
		for(int j=0;j<size;j++)
		{
			if(start+j<end)
			{
				base[i][j]=start+j;
			}
			else
			{
				base[i][j]=start+j-size;
			}
		}
		start++;
	}
	return base;
}

std::string szyfr(std::string pierwszy, std::string klucz)
{
	int size = 26, sign = 0;
	char** database = base(size);
	/*std::string database[26] = { 
		"abcdefghijklmnopqrstuvwxyz",
		"bcdefghijklmnopqrstuvwxyza",
		"cdefghijklmnopqrstuvwxyzab", 
		"defghijklmnopqrstuvwxyzabc", 
		"efghijklmnopqrstuvwxyzabcd", 
		"fghijklmnopqrstuvwxyzabcde", 
		"ghijklmnopqrstuvwxyzabcdef", 
		"hijklmnopqrstuvwxyzabcdefg", 
		"ijklmnopqrstuvwxyzabcdefgh", 
		"jklmnopqrstuvwxyzabcdefghi", 
		"klmnopqrstuvwxyzabcdefghij", 
		"lmnopqrstuvwxyzabcdefghijk", 
		"mnopqrstuvwxyzabcdefghijkl", 
		"nopqrstuvwxyzabcdefghijklm", 
		"opqrstuvwxyzabcdefghijklmn", 
		"pqrstuvwxyzabcdefghijklmno", 
		"qrstuvwxyzabcdefghijklmnop", 
		"rstuvwxyzabcdefghijklmnopq", 
		"stuvwxyzabcdefghijklmnopqr", 
		"tuvwxyzabcdefghijklmnopqrs", 
		"uvwxyzabcdefghijklmnopqrst", 
		"vwxyzabcdefghijklmnopqrstu", 
		"wxyzabcdefghijklmnopqrstuv", 
		"xyzabcdefghijklmnopqrstuvw", 
		"yzabcdefghijklmnopqrstuvwx", 
		"zabcdefghijklmnopqrstuvwxy"
	};*/
	in.open("pierwszy.txt");
	if(in.good())
	{
		out.open("klucz.txt");
		if(out.good())
		{
			while(!in.eof())
			{
				getline(in, pierwszy, ' ');
				for(int i=0;i<pierwszy.length();i++)
				{
					std::string base(database[0]);
					int posklucz = base.find(klucz[sign%klucz.length()]);
					int poswyraz = base.find(pierwszy[i]);
					pierwszy[i]=database[posklucz][poswyraz];
					sign++;
				}
				out << pierwszy<< " ";
			}
			out.close();
			in.close();
		}
		else
		{
			std::cout << "Blad utworzenia pliku";
		}
	}
	else
	{
		std::cout << "Blad otwarcia pliku";
	}
	return pierwszy;
}

std::string deszyfr(std::string zaszyfrowane, std::string klucz)
{
	int size = 26, sign = 0;
	char** database = base(size);
	std::string base(database[0]);
	std::string nowyklucz;
	for(int i=0;i<klucz.length();i++)
	{
		nowyklucz[i]=base[(size - base.find(klucz[i])) % size];
	}
	in.open("klucz.txt");
	if(in.good())
	{
		out.open("wynik.txt");
		if(out.good())
		{
			while(!in.eof())
			{
				getline(in, zaszyfrowane, ' ');
				for(int i=0;i<zaszyfrowane.length();i++)
				{
					int posklucz = base.find(nowyklucz[sign%nowyklucz.length()]);
					int poswyraz = base.find(zaszyfrowane[i]);
					std::cout << posklucz << " " << poswyraz << "\n";
					/*if(poswyraz<0)
					{
						poswyraz+=26;
					}*/
					zaszyfrowane[i]=database[posklucz][poswyraz];
					sign++;
				}
				out << zaszyfrowane<< " ";
			}
			out.close();
			in.close();
		}
		else
		{
			std::cout << "Blad utworzenia pliku";
		}
	}
	else
	{
		std::cout << "Blad otwarcia pliku";
	}
	return zaszyfrowane;
}

int main()
{ 
	/*for(int i=0;i<size;i++)
	{
		for(int j=0;j<size;j++)
		{
			std::cout<<database[i][j];
		}
		std::cout<<"\n";
	}*/
	std::string pierwszy = "", klucz = "", zaszyfrowane = "", wynik = "";
	out.open("pierwszy.txt");
	if(out.good())
	{
		std::cout <<"Podaj stringa do zaszyfrowania: ";
		std::getline(std::cin, pierwszy);
		out << pierwszy;
		out.close();
	}
	else
		std::cout<<"Blad utworzenia pliku";
	std::cout << "Podaj klucz: ";
	std::cin >> klucz;
	zaszyfrowane = szyfr(pierwszy, klucz);
	//std::cout << zaszyfrowane;
	wynik = deszyfr(zaszyfrowane, klucz);
	std::cout<<wynik;
	/*in.open("pierwszy.txt");
	if(in.good())
	{
		std::cout <<"Zapisales w pliku: ";
		while(!in.eof())
		{
			std::getline(in, pierwszy);
			std::cout<<pierwszy;
		}
		in.close();
	}
	else
		std::cout<<"Blad otwarcia pliku";*/
    system("pause");
    return 0;
}
