import java.net.*;
import java.io.*;
import java.util.Scanner;

public class client {

    private static final String EXIT = "EXIT";

    /*
     * Driver for basic client program, requires two users to send messages back and forth.
     *
     * This is just used for testing the server program, to close the connection client must
     * respond to the server with "EXIT"
     */
    public static void main(String[] args) {
        int port;
        Scanner scan = new Scanner(System.in);

        //parse args
        if (args.length < 2) return;
        String hostname = args[0];
        port = Integer.parseInt(args[1]);

        //create socket connection to given hostname and port
        try (Socket socket = new Socket(hostname, port)) {

            // continuously interact with server until the exit message is sent
            while(true) {
                OutputStream output = socket.getOutputStream();
                PrintWriter writer = new PrintWriter(output, true);
                String message = scan.nextLine();
                writer.println(message);

                // check for exit message to quit connection
                if(message.equals(EXIT)) {
                    System.out.println("Closing client");
                    socket.close();
                    scan.close();
                    break;
                }

                //wait for server response
                InputStream serverStream = socket.getInputStream();
                BufferedReader serverReader = new BufferedReader(new InputStreamReader(serverStream));
                String response = serverReader.readLine();

                System.out.println("Server response: "+ response);


            }

        } catch (UnknownHostException ex) {
            System.out.println("Server not found: " + ex.getMessage());

        } catch (IOException ex) {
            System.out.println("I/O error: " + ex.getMessage());
        }
    }
}
