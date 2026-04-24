import java.util.Scanner;

class Product {
    private int itemCode;
    private String name;
    private double cost;

    public Product(int itemCode, String name, double cost) {
        this.itemCode = itemCode;
        this.name = name;
        this.cost = cost;
    }

    public int getItemCode() {
        return itemCode;
    }

    public void setItemCode(int itemCode) {
        this.itemCode = itemCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}

class CartItem {
    private int itemCode;
    private int quantity;

    public CartItem(int itemCode, int quantity) {
        this.itemCode = itemCode;
        this.quantity = quantity;
    }

    public int getItemCode() {
        return itemCode;
    }

    public void setItemCode(int itemCode) {
        this.itemCode = itemCode;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

public class ShoppingCartProgram {
    static Product[] products = {
            new Product(1, "T-Shirt", 15.99),
            new Product(2, "Jeans", 29.99),
            new Product(3, "Shoes", 49.99),
    };

    static Product findProductByItemCode(int itemCode) {
        for(Product p : products) {
            if(p.getItemCode() == itemCode) {
                return p;
            }
        }
        return null;
    }

    static int getInt(Scanner sc) {
        return Integer.parseInt(sc.nextLine());
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.print("\nEnter the number of items you want to purchase: ");
        int numberOfCartItems = getInt(sc);

        CartItem[] cartItems = new CartItem[numberOfCartItems];

        for(int i = 0; i < numberOfCartItems; ++i) {
            System.out.print("\nEnter item number " + (i + 1) + ": ");
            int itemCode = getInt(sc);

            System.out.print("\nEnter the quantity: ");
            int quantity = getInt(sc);

            cartItems[i] = new CartItem(itemCode, quantity);

            System.out.println();
        }


        // Display details
        System.out.println("\nName: " + name);

        System.out.println("\nItem Purchased:");
        System.out.println("Item\tQuantity\tCost/item\tTotal costs");

        double totalCost = 0;
        int totalItems = 0;

        for(CartItem item : cartItems) {
            Product p = findProductByItemCode(item.getItemCode());
            double itemCost = p.getCost() * item.getQuantity();

            System.out.printf("%s\t%d\t$%.2f\t$%.2f\n",
                    p.getName(), item.getQuantity(),
                    p.getCost(), itemCost);

            totalItems += item.getQuantity();
            totalCost += itemCost;
        }

        double totalDiscount = 0;

        if(totalItems > 3) {
            totalDiscount += 5;
        }
        if(totalCost > 80) {
            totalDiscount += 10;
        }


        double discountAmount = (totalCost * totalDiscount / 100);
        double finalCost = totalCost - discountAmount;

        System.out.printf("\nTotal Cost before discount: $%.2f\n", totalCost);
        System.out.printf("\nApplied Discount: %.2f%%\n", totalDiscount);
        System.out.printf("\nDiscounted Amount: $%.2f\n", -discountAmount);
        System.out.printf("\nFinal Total Cost: $%.2f", finalCost);
    }
}