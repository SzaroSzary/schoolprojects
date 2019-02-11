#include <iostream>
#include <string>
#include <fstream>

std::ifstream in;
std::ofstream out;

std::string skrot(std::string wiadomosc, int row)
{
	int S[8] = {'A', 'L', 'G', 'O', 'R', 'Y', 'T', 'M'};
	if(wiadomosc.length()%8!=0)
	{
		int l = 8-wiadomosc.length()%8;
		for(int i=0;i<l;i++)
		{
			wiadomosc+= ".";
		}
	}
	for(int i=0;i<wiadomosc.length();i+=8)
	{
		std::string temp = wiadomosc.substr(i,8);
		for(int j=0;j<8;j++)
		{
			S[j] = (S[j] + temp[j])%128;
		}
	}
	std::string wynik;
	for(int i=0;i<8;i++)
	{
		wynik+=char(65+S[i]%26);
	}
	if(row == 0)
	{
		out.open("epodpis_wynik.txt");
		if(out.good())
		{
			out <<"78.1\n\n"<< wiadomosc.length() << "\n";
			for(int i= 0;i<8;i++)
			{
				out << S[i] << " ";
			}
			out << "\n" << wynik << "\n";
			out.close();
		}
	}
	return wynik;
}

std::string* A(int d, int n, int podpisy[][8])
{
	static std::string wynik[11];
	for(int i = 0;i<11;i++)
	{
		for(int j=0;j<8;j++)
		{
			wynik[i] += podpisy[i][j]*d%n;
		}
	}
	return wynik;
}

int main()
{
	int d = 3, n = 200, podpisy[11][8];
	std::string text[11], temp;
	in.open("wiadomosci.txt");
	if(in.good())
	{
		int i = 0;
		while ( getline (in,temp) )
	    {
	    	text[i]=temp;
	    	i++;
    	}
		in.close();
	}
	in.open("podpisy.txt");
	if(in.good())
	{
		for(int i=0;i<11;i++)
		{
			for(int j=0;j<8;j++)
			{
				in>>podpisy[i][j];
			}
		}
		in.close();
	}
	std::string result1[11];
	for(int i = 0;i<11;i++)
	{
		result1[i] = skrot(text[i],i);
	}
	std::string *result2 = A(d,n,podpisy);
	std::string tmp, tmp2;
	in.open("epodpis_wynik.txt");
	if(in.good())
	{
		while(!in.eof())
		{
			while(getline(in, tmp2))
			{
				tmp = tmp + '\n' +tmp2;	
			}
		}
		in.close();
	}
	out.open("epodpis_wynik.txt");
	if(out.good())
	{
		out << tmp <<"\n\n78.2\n\n";
		tmp+="\n\n78.2\n\n";
		for(int i= 0;i<11;i++)
		{
			out << result2[i] << "\n";
			tmp+= result2[i] + "\n";
		}
		out <<"\n\n78.3\n\n";
		tmp+="\n\n78.3\n\n";
		for(int i =0;i<11;i++)
		{
			if(result1[i]==result2[i])
			{
				out << i+1 << " ";
				tmp+= i+1 + " ";
			}
		}
		out.close();
	}
	system("pause");
	return 0;	
}
