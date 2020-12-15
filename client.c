#include <stdio.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#define PORT 33333

// https://www.geeksforgeeks.org/socket-programming-cc/

int main(int argc, char *argv[]) {
	
	int sock = 0; //socket file descriptor
	struct sockaddr_in serv; //server info struct
	char *hello = "Hello\n"; //test message

	char buffer[1024] = {0}; //input buffer (not used)


	// create TCP socket connection, ipv4
	if((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0) {

		perror("Socket creation error");
		return -1;
	}

	//memset?

	serv.sin_family = AF_INET;
	serv.sin_port = htons(PORT);
	
	// convert standard ipv4 format to readable format
	if(inet_pton(AF_INET, "192.168.0.151", &serv.sin_addr) <= 0) {
		perror("Addr not supported");
		return -1;
	}

	//connect to the socket
	if(connect(sock, (struct sockaddr *) &serv, sizeof(serv)) < 0) {

		perror("Connection failed");
		return -1;
	}

	//send message
	send(sock, hello, strlen(hello), 0);
	
	//clean up memory?
	close(sock); //delete file descriptor

	return 0;
}
