#include <iostream>
#include <string>
#include <fstream>

std::ifstream in;
std::ofstream out;

int euler(int p, int q)
{
	return (p-1)*(q-1);
}

int euklides(int a, int b, int p)
{
	int x, y, d;
	for(int i =a;i<=b;i++)
	{
		x= i;
		y= p;
		while(y)
		{
			d = y;
			y = x%y;
			x = d;
		}
		if(x==1)
		{
			if(i!=1)
			{
				return i;	
			}
		}
	}
	return 0;
}

int extended_euklides(int a, int b)
{
	int u=1, w=a, x=0, z=b, q;
	while(w)
	{
		if(w<z)
		{
			q=u; u=x; x=q;
			q=w; w=z; z=q;
		}
		q=w/z;
		u-=q*x;
		w-=q*z;
	}
	if(z==1)
	{
		if(x<0)
			x+=b;
		return x;
	}
}

int horner(int a, int b, int m)
{
	//std::cout<<a<<" "<<b<< " "<<m<<"\n";
	int res = 1, k, r;
	while(b>0)
	{
		k = b/2;
		r = b-2*k;
		if(r==1)
			res = (res*a)%m;
		a = (a*a)%m;
		b = k;
	}
	return res;
}

std::string to_cypher(std::string input, int key[])
{
	std::string result;
	for(int i = 0;i<input.length();i++)
	{
		int temp = (int)input[i];
		int cypheredtemp = horner(temp,key[0],key[1]);
		char cyphersign = (char)cypheredtemp;
		result+=cyphersign;
		/*std::cout<<temp<<"\n";
		std::cout<<cypheredtemp<<"\n";
		std::cout<<cyphersign<<"\n";*/
	}
	return result;
}

int main()
{
	int p, q, n, fi, e, d, kpriv[2], kpub[2];
	std::string cypher = "", output;
	std::cin>>p;
	std::cin>>q;
	n = p*q;
	fi = euler(p,q);
	e = euklides(1,fi,fi);
	d = extended_euklides(e, fi);
	kpub[0] = e;
	kpub[1] = n;
	kpriv[0] = d;
	kpriv[1] = n;
	int count;
	std::cin >> count;
	std::string tempinput[count], input;
	for(int i=0;i<count;i++)
	{
		std::cin>>tempinput[i];
	}
	for(int i=0;i<count;i++)
	{
		input+=tempinput[i];
		if(count-i!=1)
		{
			input+= ' ';
		}
	}
	cypher = to_cypher(input,kpub);
	std::cout << cypher;
	out.open("rsa.txt");
	if(out.good())
	{
		out << cypher << "\n";
		out.close();
	}
	std::string decypher, temp, decyphered;
	in.open("rsa.txt");
	if(in.good())
	{
		while ( getline (in,temp) )
	    {
	    	decypher+=temp;
    	}
		in.close();
	}
	decyphered = to_cypher(decypher,kpriv);
	std::cout <<'\n'<<decyphered<<'\n';
	system("pause");
	return 0;	
}
