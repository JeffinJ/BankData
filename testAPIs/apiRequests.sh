
# POST API to generate a new JWT token
# ======================================
# curl --location --request POST 'https://enigmatic-scrubland-14973.herokuapp.com/getToken' \
# --header 'Content-Type: application/json' \
# --data-raw '{
#     "app_id":"bankdetailsapp",
#     "password":"bank@password@"
# }'

# GET API to fetch a bank details, given branch IFSC code
# =========================================================
curl --location --request GET 'https://enigmatic-scrubland-14973.herokuapp.com/bank/ABHY0065002' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiJiYW5rZGV0YWlsc2FwcCIsImlhdCI6MTY0MjYyMjQ3MCwiZXhwIjoxNjQzMDU0NDcwfQ.5LW4bug3Cu14mtHZZ5v87KZ7LuDG-flX5n4OMMgIpoA'

# GET API to fetch all details of branches, given bank name and a city.with optional limit and offset parameters
# ================================================================================================================
curl --location --request GET 'https://enigmatic-scrubland-14973.herokuapp.com/branches/ABHYUDAYA COOPERATIVE BANK LIMITED/MUMBAI/5' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiJiYW5rZGV0YWlsc2FwcCIsImlhdCI6MTY0MjYyMjQ3MCwiZXhwIjoxNjQzMDU0NDcwfQ.5LW4bug3Cu14mtHZZ5v87KZ7LuDG-flX5n4OMMgIpoA'