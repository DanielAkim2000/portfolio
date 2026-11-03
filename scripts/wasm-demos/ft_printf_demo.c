/* Démo de ft_printf pour le portfolio : une ligne = une conversion, au format  format|valeur
   Chaque ligne est passée à ft_printf puis au printf de la libc, pour comparer.            */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "ft_printf.h"

static char	find_type(const char *fmt)
{
	const char	*p = strchr(fmt, '%');

	if (!p)
		return (0);
	for (p++; *p; p++)
		if (strchr("cspdiuxX%", *p))
			return (*p);
	return (0);
}

/* Les deux appels écrivent via write(1), l'ordre de sortie reste donc celui du programme. */
static void	compare(const char *fmt, char type, const char *arg)
{
	char	buf[512];
	int		ret_ft;
	int		ret_libc;

	ft_putstr_fd("ft_printf : [", 1);
	switch (type)
	{
		case 'c': ret_ft = ft_printf(fmt, arg[0]); ret_libc = snprintf(buf, sizeof(buf), fmt, arg[0]); break ;
		case 's': ret_ft = ft_printf(fmt, strcmp(arg, "NULL") ? arg : NULL);
			ret_libc = snprintf(buf, sizeof(buf), fmt, strcmp(arg, "NULL") ? arg : NULL); break ;
		case 'd': case 'i': ret_ft = ft_printf(fmt, atoi(arg)); ret_libc = snprintf(buf, sizeof(buf), fmt, atoi(arg)); break ;
		case 'u': case 'x': case 'X': ret_ft = ft_printf(fmt, (unsigned int)strtoul(arg, NULL, 0));
			ret_libc = snprintf(buf, sizeof(buf), fmt, (unsigned int)strtoul(arg, NULL, 0)); break ;
		case 'p': ret_ft = ft_printf(fmt, (void *)strtoul(arg, NULL, 0));
			ret_libc = snprintf(buf, sizeof(buf), fmt, (void *)strtoul(arg, NULL, 0)); break ;
		default: ret_ft = ft_printf(fmt); ret_libc = snprintf(buf, sizeof(buf), fmt, 0); break ;
	}
	ft_putstr_fd("]  retour ", 1);
	ft_putnbr_fd(ret_ft, 1);
	ft_putstr_fd("\nprintf    : [", 1);
	ft_putstr_fd(buf, 1);
	ft_putstr_fd("]  retour ", 1);
	ft_putnbr_fd(ret_libc, 1);
	ft_putstr_fd(ret_ft == ret_libc ? "\n=> mêmes valeurs de retour\n" : "\n=> valeurs de retour différentes\n", 1);
}

int	main(void)
{
	char	line[512];
	char	*sep;
	char	type;

	while (fgets(line, sizeof(line), stdin))
	{
		line[strcspn(line, "\r\n")] = '\0';
		if (line[0] == '\0' || line[0] == '#')
			continue ;
		sep = strchr(line, '|');
		if (sep)
			*sep++ = '\0';
		type = find_type(line);
		printf("> format \"%s\"  valeur \"%s\"\n", line, sep ? sep : "");
		fflush(stdout);
		if (!type || (type != '%' && !sep))
		{
			puts("Format : %conversion|valeur   (conversions : c s p d i u x X %)");
			continue ;
		}
		compare(line, type, sep ? sep : "");
	}
	return (0);
}
