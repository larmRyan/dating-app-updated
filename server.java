import java.io.*;
import java.net.*;
import java.util.Date;
import java.util.IllegalFormatException;
import java.util.Scanner;


/*
 * https://www.codejava.net/java-se/networking/java-socket-server-examples-tcp-ip
 */
public class server {

    private static final String EXIT = "EXIT";

    /*
     * Driver for basic server program, requires two users to send messages back and forth.
     * Keeps interacting with the client until the server receives "EXIT" message, then
     * closes all connections and cleans up the memory.
     */
    public static void main(String[] args) {

        int port;
        Scanner scan = new Scanner(System.in);

        // parse args
        if (args.length < 1) return;

        try {
            port = Integer.parseInt(args[0]);
        } catch (IllegalFormatException e) {
            System.out.println("first argument must be the port number");
            return;
        }

        // Open socket for listening
        try (ServerSocket serverSocket = new ServerSocket(port)) {

            System.out.println("Server is listening on port " + port);

            // accept first incoming connection request
            Socket socket = serverSocket.accept();
            System.out.println("New client connected");

            // Continuously read from client
            while (true) {

                // parse the data sent from client
                InputStream clientStream = socket.getInputStream();
                BufferedReader clientReader = new BufferedReader(new InputStreamReader(clientStream));

                String message = clientReader.readLine();

                // check for exit message to end connection
                if (message.equals(EXIT)) {
                    System.out.println("Client disconnected, now closing connection");
                    socket.close();
                    scan.close();
                    break;
                } else {
                    System.out.println("Client message: " + message);
                }

                // respond to the client
                OutputStream output = socket.getOutputStream();
                PrintWriter writer = new PrintWriter(output, true);
                String response = scan.nextLine();

                writer.println(response);


            }

        } catch (IOException ex) {
            System.out.println("Server exception: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}