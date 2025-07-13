# Product & Brand Information REST API

I've developed a REST API with a modular service architecture. It's frontend-agnostic, using EJS only for a temporary testing interface. The API focuses on data normalization and is built with a flexible approach that extends beyond the classical monolithic understanding.

From the outset, I've established an infrastructure capable of integrating with advanced systems like Redis, RabbitMQ, and web crawlers. Each component is designed with the flexibility to be refactored into its own microservice if needed.

This project is a comprehensive REST API and web interface, distinguished by its multi-source product aggregation capability. It dynamically collects product data from various API sources like AliExpress and Realtime Product Search. Thanks to its flexible API integration architecture, new and different API services can be easily integrated; administrators can expand the system by adding new API sources to the database. Additionally, a dedicated interface for API integration management is provided. With a user-friendly approach, search results are displayed using modern and responsive product cards, offering brand-based search for filtering, and ensuring tab persistence in the product search interface.

Users can register, log in, change their passwords, submit product and brand suggestions, propose new ideas, and even share their own API integrations. Administrator users can oversee all these contributions and manage the API sources.

## **Features**

### User Management and Authentication

- **User Registration & Login:** Secure registration and JWT-based authentication.

- **Password Security:** Password strength analysis using zxcvbn (very weak, weak, medium, strong, very strong).

- **Email Verification:** An email verification flow for newly registered users.

- **Google OAuth:** Easy and quick login using a Google account.

- **Password Change:** Secure password updates by verifying the current password.

- **Profile Management:** Ability to upload and update profile pictures.

- **Redirection Improvements:** Users are redirected directly to the dashboard after successful registration.

## Admin Panel

- **Secure Access:** Accessible only by authenticated administrator users.

- **User Management:** Administrators can view users within the system.

- **Contribution Oversight:** View brand, idea, API, and email contributions.

- **User Status Visualization:** Visual indicators (e.g., red background) for unapproved users in the admin panel.

- **Fullscreen Mode:** An enhanced user experience for the admin panel with a fullscreen popup window.

## Feedback and Communication

- **Email Feedback:** Allows users to send feedback via email, with feedback saved to the database.

- **Automatic Info Population:** Automatic form field population for logged-in users in the feedback section.

- **Flash Messages:** Instant feedback messages (success/error) for user actions.

# Setup and Running the Project

Follow these steps to set up and run the project on your local machine:

## Prerequisites

- Node.js (LTS version recommended)

- MongoDB

    ## 1. Installation Steps


        git clone https://github.com/YakupHadutoglu/Product-Brand-Information-REST-API.gitcd Product-Brand-Information-REST-API


    ## 2. Install dependencies:


      npm install


    ## 3. Configure Environment Variables:


        PORT=5002
        MONGO_URI=mongodb://localhost:27017/products_brand_information
        JWT_SECRET=your_strong_secret_key_here
        JWT_EXPIRATION=3600
        NODE_ENV=development
        EMAIL_HOST=smtp.ethereal.email
        EMAIL_PORT=587
        EMAIL_USER=jeremie.bogan@ethereal.email
        EMAIL_PASS=VU7GR94u2fSANREACR
        GOOGLE_CLIENT_ID=41ththb1665071746981-bv8kgah7bfugb351qo7knjn4roe6nnn7jsefg.apps.googleusercontent.com
        GOOGLE_CLIENT_SECRET=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a7Mb
        RAPIDAPI_KEY=10f3f48b90mshd3f8440fb0f3afbt65Np1371e0jsn3be033224b5c
        ALIEXPRESS_HOST=aliexpress-datahub.p.rapidapi.com
        ALIEXPRESS_API_KEY=10f3f48b90mshd3f8440rrfb0f3afbp1371e0jsn3be0332E865c24b5c

    - **PORT:** The port on which the application will run.

    - **MONGO_URI:** The connection URI for your MongoDB database.

    - **JWT_SECRET:** A secret key used to sign JSON Web Tokens. In a real project, replace this with a strong, unique string.

    - **JWT_EXPIRATION:** The expiration time for JWTs (in seconds).

    - **NODE_ENV:** The environment mode (e.g., development, production).

    - **EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS:** SMTP server credentials for sending emails. For development, you can use Ethereal Mail for testing.

    - **GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET:** Google OAuth credentials obtained from the Google Cloud Console.

    - **RAPIDAPI_KEY:** Your general API key obtained from RapidAPI.

    - **ALIEXPRESS_HOST, ALIEXPRESS_API_KEY:** The host and API key required for AliExpress RapidAPI integration.

    ## 4. Start the Database:

    - Ensure your MongoDB server is running.

    ## 5. Start the Application:

        npm start

    The application should now be running on the port you specified (default: 5002). You can visit http://localhost:5002 in your browser.

# Technical Details

* **API Integration and Data Normalization**

    The project offers an advanced and highly flexible structure for multi-source API integration through its productAggregator.service.js and apiSource.service.js files:
* **apiSource.service.js:**


    - **Dynamic Source Loading:** Dynamically loads active API sources (stored as API models in the database). This means you don't need to change code to add a new API to the system; it can be easily configured from the admin panel.

    - **Axios Client Integration:** Creates a dedicated Axios HTTP client for each API source.

    - **RapidAPI Support:** Automatically configures RapidAPI-specific headers like X-RapidAPI-Key and X-RapidAPI-Host, allowing easy integration of various RapidAPI sources.

    - **Caching (cachedSources):** Caches loaded API sources to reduce database queries and improve performance.

    - **Timeout:** API requests have a defined timeout between 8 to 15 seconds, preventing slow or unresponsive APIs from blocking the system.

* **productAggregator.service.js:**

    - **General Search Function (search):** Takes user queries and performs parallel product searches across all configured API sources.

    - **Parameter Mapping (mapParams):** Maps user-provided parameters to the specific parameter names expected by each API, accommodating varying input requirements.

    - **Path Building (buildPath):** Constructs full API URLs by populating dynamic parameters ({paramName}) in API paths with values from the user query.

    - **Error Handling:** Includes comprehensive error catching and logging mechanisms for each API call, simplifying the diagnosis of integration issues.

    - **Data Normalization (normalize):** Transforms raw and varied product data structures from different APIs (e.g., AliExpress, Realtime Product Search) into a single, consistent format usable by the application. This ensures the frontend doesn't need to handle disparate API responses. For example,  it follows the result.resultList.item path for AliExpress, while processing paths like organic_results.organic_products or data.products for Realtime Product Search. When a new API is added, only its specific normalization logic needs to be integrated into this function.


## Other Technical Enhancements

- **Middleware Chain:** An optimized Express middleware chain for authentication, authorization, and cache control.

- **Error Handling:** A user-friendly 404 error page and general error management.

- **Code Clean-up:** Improvements in readability and organization within frontend and middleware files.

- **EJS Compatibility:** Conversion of ES6 arrow functions to traditional function expressions for compatibility with the EJS template engine.

- **Cache Prevention:** Prevents browser caching by forcing page reloads on back operations, enhancing security.

## Usage

- **Homepage:** User registration/login, product search, and general information.

- **Register:** Create a new account. Define more secure passwords with a strength indicator.

- **Login:** Log in with your existing account or sign in with Google.

- **Dashboard (/dashboard):** A dedicated area for logged-in users.

- **Product/Brand Contribution (/contribution):** Add new brand and product information to the system.

- **Idea Submission (/new-idea):** Share your new ideas.

- **API Contribution (/api-contribution):** Introduce your own API services.

- **Admin Panel (/admin):**  User and contribution oversight for users with administrator privileges only.

## Development and Contribution
This project is open for continuous development. All contributions are welcome.


### Contribution Guide

1. Fork the repository.

2. Create a new branch for a feature or bug fix (git checkout -b feature/AmazingFeature or fix/BugFix).

3. Make your changes and write descriptive commit messages (git commit -m 'feat(module): Add some AmazingFeature').

4. Push your changes to the remote repository (git push origin feature/AmazingFeature).

5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

Yakup Hadutoglu - yakuphad2004@gmail.com

Project Link: https://github.com/YakupHadutoglu/Product-Brand-Information-REST-API
