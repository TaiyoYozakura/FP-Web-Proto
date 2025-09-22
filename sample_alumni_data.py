import pandas as pd
import random

# Sample alumni data
alumni_data = {
    'firstName': [
        'Rajesh', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anita', 'Rohit', 'Kavya', 
        'Suresh', 'Meera', 'Arjun', 'Divya', 'Kiran', 'Pooja', 'Ravi', 'Nisha',
        'Arun', 'Sita', 'Manoj', 'Rekha', 'Deepak', 'Sunita', 'Ajay', 'Geeta',
        'Vinod', 'Lata', 'Prakash', 'Usha', 'Ramesh', 'Shanti'
    ],
    'lastName': [
        'Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Joshi', 'Reddy', 'Nair',
        'Agarwal', 'Mehta', 'Shah', 'Verma', 'Rao', 'Iyer', 'Mishra', 'Pandey',
        'Tiwari', 'Srivastava', 'Chopra', 'Malhotra', 'Bansal', 'Saxena', 'Jain', 'Arora',
        'Kapoor', 'Bhatia', 'Khanna', 'Sethi', 'Goel', 'Agrawal'
    ],
    'email': [
        'rajesh.sharma@gmail.com', 'priya.patel@yahoo.com', 'amit.kumar@hotmail.com',
        'sneha.singh@gmail.com', 'vikram.gupta@outlook.com', 'anita.joshi@gmail.com',
        'rohit.reddy@yahoo.com', 'kavya.nair@gmail.com', 'suresh.agarwal@hotmail.com',
        'meera.mehta@gmail.com', 'arjun.shah@yahoo.com', 'divya.verma@gmail.com',
        'kiran.rao@outlook.com', 'pooja.iyer@gmail.com', 'ravi.mishra@yahoo.com',
        'nisha.pandey@gmail.com', 'arun.tiwari@hotmail.com', 'sita.srivastava@gmail.com',
        'manoj.chopra@yahoo.com', 'rekha.malhotra@gmail.com', 'deepak.bansal@outlook.com',
        'sunita.saxena@gmail.com', 'ajay.jain@yahoo.com', 'geeta.arora@gmail.com',
        'vinod.kapoor@hotmail.com', 'lata.bhatia@gmail.com', 'prakash.khanna@yahoo.com',
        'usha.sethi@gmail.com', 'ramesh.goel@outlook.com', 'shanti.agrawal@gmail.com'
    ],
    'graduationYear': [
        '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022',
        '2014', '2013', '2015', '2016', '2017', '2018', '2019', '2020',
        '2021', '2022', '2014', '2013', '2015', '2016', '2017', '2018',
        '2019', '2020', '2021', '2022', '2014', '2013'
    ],
    'position': [
        'Software Engineer', 'Product Manager', 'Data Scientist', 'Marketing Manager',
        'Business Analyst', 'UI/UX Designer', 'DevOps Engineer', 'Sales Manager',
        'Financial Analyst', 'HR Manager', 'Project Manager', 'Quality Assurance',
        'Research Scientist', 'Operations Manager', 'Content Writer', 'Graphic Designer',
        'System Administrator', 'Database Administrator', 'Network Engineer', 'Consultant',
        'Team Lead', 'Senior Developer', 'Product Owner', 'Scrum Master',
        'Technical Writer', 'Business Development', 'Account Manager', 'Data Analyst',
        'Software Architect', 'Engineering Manager'
    ],
    'company': [
        'TCS', 'Infosys', 'Wipro', 'HCL Technologies', 'Tech Mahindra', 'Cognizant',
        'Accenture', 'IBM', 'Microsoft', 'Google', 'Amazon', 'Flipkart',
        'Paytm', 'Zomato', 'Swiggy', 'Ola', 'Uber', 'BYJU\'S',
        'Unacademy', 'PhonePe', 'Razorpay', 'Freshworks', 'Zoho', 'InMobi',
        'Myntra', 'BigBasket', 'Nykaa', 'PolicyBazaar', 'MakeMyTrip', 'BookMyShow'
    ],
    'location': [
        'Mumbai', 'Bangalore', 'Pune', 'Delhi', 'Hyderabad', 'Chennai',
        'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
        'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
        'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
        'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
    ],
    'phone': [
        f'+91-{random.randint(7000000000, 9999999999)}' for _ in range(30)
    ]
}

# Create DataFrame
df = pd.DataFrame(alumni_data)

# Save to Excel
df.to_excel('sample_alumni_data.xlsx', index=False)
print("✓ Sample alumni data Excel file created: sample_alumni_data.xlsx")
print(f"✓ Contains {len(df)} alumni records")
print("✓ Columns:", list(df.columns))