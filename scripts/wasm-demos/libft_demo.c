/* Démo de Libft pour le portfolio : une ligne = un appel, au format  fonction|arg1|arg2|arg3
   Les fonctions qui existent dans la libc sont comparées avec elles.                      */
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "libft.h"

#define MAX_FIELDS 4

static int	is(const char *name, const char *fn)
{
	if (strncmp(name, "ft_", 3) == 0)
		name += 3;
	return (strcmp(name, fn) == 0);
}

static void	show_str(const char *label, const char *s)
{
	if (s)
		printf("%-9s -> \"%s\"\n", label, s);
	else
		printf("%-9s -> (null)\n", label);
}

static void	show_pos(const char *label, const char *base, const char *p)
{
	if (p)
		printf("%-9s -> index %ld (\"%s\")\n", label, (long)(p - base), p);
	else
		printf("%-9s -> (null)\n", label);
}

static void	run_split(char *s, char c)
{
	char	**tab;
	int		i;

	tab = ft_split(s, c);
	if (!tab)
		return ((void)printf("ft_split   -> (null)\n"));
	printf("ft_split   -> [");
	for (i = 0; tab[i]; i++)
		printf("%s\"%s\"", i ? ", " : "", tab[i]);
	printf("]  (%d mot(s))\n", i);
	for (i = 0; tab[i]; i++)
		free(tab[i]);
	free(tab);
}

static void	help(void)
{
	puts("Format : fonction|arg1|arg2|arg3   (le préfixe ft_ est facultatif)");
	puts("  strlen|texte            atoi|-42            itoa|-123");
	puts("  strchr|texte|o          strrchr|texte|o     strncmp|abc|abd|3");
	puts("  strnstr|gros|petit|10   substr|texte|2|4    strjoin|ab|cd");
	puts("  strtrim|--abc--|-       split|a,b,,c|,      strdup|texte");
	puts("  toupper|a  tolower|A  isalpha|a  isdigit|7  isalnum|_  isprint|~");
}

static void	dispatch(char **f, int n)
{
	char	*r;

	if (is(f[0], "help"))
		return (help());
	if (is(f[0], "strlen") && n >= 2)
		return ((void)printf("ft_strlen  -> %zu\nstrlen     -> %zu\n", ft_strlen(f[1]), strlen(f[1])));
	if (is(f[0], "atoi") && n >= 2)
		return ((void)printf("ft_atoi    -> %d\natoi       -> %d\n", ft_atoi(f[1]), atoi(f[1])));
	if (is(f[0], "itoa") && n >= 2)
		return ((void)(r = ft_itoa(atoi(f[1])), show_str("ft_itoa", r), free(r)));
	if (is(f[0], "strchr") && n >= 3)
		return (show_pos("ft_strchr", f[1], ft_strchr(f[1], f[2][0])), show_pos("strchr", f[1], strchr(f[1], f[2][0])));
	if (is(f[0], "strrchr") && n >= 3)
		return (show_pos("ft_strrchr", f[1], ft_strrchr(f[1], f[2][0])), show_pos("strrchr", f[1], strrchr(f[1], f[2][0])));
	if (is(f[0], "strncmp") && n >= 4)
		return ((void)printf("ft_strncmp -> %d\nstrncmp    -> %d\n", ft_strncmp(f[1], f[2], atoi(f[3])), strncmp(f[1], f[2], atoi(f[3]))));
	if (is(f[0], "strnstr") && n >= 4)
		return (show_pos("ft_strnstr", f[1], ft_strnstr(f[1], f[2], atoi(f[3]))));
	if (is(f[0], "substr") && n >= 4)
		return ((void)(r = ft_substr(f[1], atoi(f[2]), atoi(f[3])), show_str("ft_substr", r), free(r)));
	if (is(f[0], "strjoin") && n >= 3)
		return ((void)(r = ft_strjoin(f[1], f[2]), show_str("ft_strjoin", r), free(r)));
	if (is(f[0], "strtrim") && n >= 3)
		return ((void)(r = ft_strtrim(f[1], f[2]), show_str("ft_strtrim", r), free(r)));
	if (is(f[0], "strdup") && n >= 2)
		return ((void)(r = ft_strdup(f[1]), show_str("ft_strdup", r), free(r)));
	if (is(f[0], "split") && n >= 3)
		return (run_split(f[1], f[2][0]));
	if (is(f[0], "toupper") && n >= 2)
		return ((void)printf("ft_toupper -> '%c'\ntoupper    -> '%c'\n", ft_toupper(f[1][0]), toupper(f[1][0])));
	if (is(f[0], "tolower") && n >= 2)
		return ((void)printf("ft_tolower -> '%c'\ntolower    -> '%c'\n", ft_tolower(f[1][0]), tolower(f[1][0])));
	if (is(f[0], "isalpha") && n >= 2)
		return ((void)printf("ft_isalpha -> %s\n", ft_isalpha(f[1][0]) ? "oui" : "non"));
	if (is(f[0], "isdigit") && n >= 2)
		return ((void)printf("ft_isdigit -> %s\n", ft_isdigit(f[1][0]) ? "oui" : "non"));
	if (is(f[0], "isalnum") && n >= 2)
		return ((void)printf("ft_isalnum -> %s\n", ft_isalnum(f[1][0]) ? "oui" : "non"));
	if (is(f[0], "isprint") && n >= 2)
		return ((void)printf("ft_isprint -> %s\n", ft_isprint(f[1][0]) ? "oui" : "non"));
	puts("Appel inconnu ou arguments manquants (tape help).");
}

int	main(void)
{
	char	line[1024];
	char	*f[MAX_FIELDS];
	int		n;
	char	*p;

	while (fgets(line, sizeof(line), stdin))
	{
		line[strcspn(line, "\r\n")] = '\0';
		if (line[0] == '\0' || line[0] == '#')
			continue ;
		printf("> %s\n", line);
		n = 0;
		p = line;
		f[n++] = p;
		while (n < MAX_FIELDS && (p = strchr(p, '|')))
		{
			*p++ = '\0';
			f[n++] = p;
		}
		dispatch(f, n);
	}
	return (0);
}
