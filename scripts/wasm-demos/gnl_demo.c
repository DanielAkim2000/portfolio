/* Démo de get_next_line pour le portfolio : lit l'entrée standard ligne par ligne
   et montre ce que renvoie chaque appel (le \n final est rendu visible).            */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char	*get_next_line(int fd);

static void	show(const char *line)
{
	for (; *line; line++)
	{
		if (*line == '\n')
			fputs("\\n", stdout);
		else
			putchar(*line);
	}
}

int	main(void)
{
	char	*line;
	int		count;

	count = 0;
	while ((line = get_next_line(0)) != NULL)
	{
		count++;
		printf("appel %d (%zu octets) : \"", count, strlen(line));
		show(line);
		puts("\"");
		free(line);
	}
	printf("appel %d : NULL, fin du fichier\n", count + 1);
	return (0);
}
