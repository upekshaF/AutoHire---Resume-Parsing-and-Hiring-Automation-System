import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from tika import parser
import spacy
import json
app = Flask(__name__)
CORS(app)


nlp = spacy.load('en_core_web_sm')
from spacy.matcher import Matcher
matcher = Matcher(nlp.vocab)

# Define keywords
keywords = ["education",   "academic profile", "other activities", 
            "Educational Qualification", "qualifications", "experience", "interests", "skills", 
            "achievements", "publications", "publication", "certifications", "workshops", "projects", 
            "internships", "trainings", "hobbies", "overview", "objective", "position of responsibility", 
            "jobs", "University", "institute", "School", "years"]

def extract_name(text):
   nlp_text = nlp(text)
  
   # First name and Last name are always Proper Nouns
   pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]
  
   matcher.add('NAME', [pattern], on_match = None)
  
   matches = matcher(nlp_text)
  
   for match_id, start, end in matches:
       span = nlp_text[start:end]
       return span.text
   
def get_email_addresses_top_area(string, max_lines=60):
    # Extract only the top area of the document
    lines = string.split('\n')[:max_lines]
    top_area_text = ' '.join(lines)

    # Find standalone email addresses in the top area
    r = re.compile(r'[\w\.-]+@[\w\.-]+')
    email_addresses = r.findall(top_area_text)

    return email_addresses

def get_mobile_numbers(string):
    # Define the top area criteria, for example, the first 500 characters
    top_area = string[:500]

    # Use regular expression to extract phone numbers
    r = re.compile(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
    phone_numbers = r.findall(top_area)

    # Filter and clean the phone numbers to get only valid mobile numbers with 10 digits
    valid_mobile_numbers = [re.sub(r'\D', '', num) for num in phone_numbers if len(re.sub(r'\D', '', num)) == 10]

    return valid_mobile_numbers


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    uploaded_file = request.files['file']
    skill_points_json = request.form.get('skillPointsArray')
   # skill_points_array = json.loads(skill_points_json)
    print("Uploaded file:", uploaded_file.filename)
    print(skill_points_json)
    
    # Process the uploaded file here
    # Example: Save the file or extract text using Tika




    # Example using Tika to extract text
    try:
        resume_text = parser.from_buffer(uploaded_file.read())['content']
        mobile_numbers = get_mobile_numbers(resume_text)
        name = extract_name(resume_text)
        email_addresses = get_email_addresses_top_area(resume_text)

        sections = {}
        for keyword in keywords:
            pattern = re.compile(r'\b{}\b'.format(keyword), re.IGNORECASE)
            matches = pattern.finditer(resume_text)
            for match in matches:
                start = match.start()
                end = match.end()
                section_text = resume_text[start:end]
                sections[keyword] = section_text

        sections = {}
        for keyword in keywords:
            try:
                start_index = resume_text.index(keyword) + len(keyword)
                content = resume_text[start_index:]
                sections[keyword] = content
            except ValueError:
                pass


         # Text preprocessing
        resume_text = resume_text.replace("\n", " ")
        resume_text = re.sub(r'[^a-zA-Z0-9]', ' ', resume_text)
        resume_text = re.sub(r'\W+', '', resume_text)
        resume_text = resume_text.lower()


        # Sorting the indices
        indices = list(sections.keys())
        keys = list(sections.values())
        zipped_lists = zip(indices, keys)
        sorted_pairs = sorted(zipped_lists)
        tuples = zip(*sorted_pairs)
        indices, keys = [list(tuple) for tuple in tuples]

        # Extracting content between consecutive indices
        content = []
        sorted_sections = sorted(sections.items(), key=lambda x: resume_text.index(x[0].lower()))
        for i in range(len(sorted_sections) - 1):
            section_text = resume_text[resume_text.index(sorted_sections[i][0].lower()) + len(sorted_sections[i][0]): resume_text.index(sorted_sections[i+1][0].lower())]
            content.append(section_text)
        last_section_text = resume_text[resume_text.index(sorted_sections[-1][0].lower()) + len(sorted_sections[-1][0]):]
        content.append(last_section_text)


        # Populate parsed_content with extracted content
        
        parsed_content = {'name': name, 'email_addresses': email_addresses , 'mobile_numbers':mobile_numbers, 'sections':sections, 'Content':content}
       
        for i in range(len(sorted_sections)):
            parsed_content[sorted_sections[i][0]] = content[i]


        
        # Convert parsed_content to JSON format
        with open("Parsed_Resume.json", "w") as outfile:
            json.dump(parsed_content, outfile)

        # def check_skills(parsed_content):
        #     # Check if 'skills' key exists in parsed_content
        #     if 'skills' in parsed_content:
        #         skills = parsed_content['skills']  # Get the skills dictionary
        #         # Define points for each skill if they exist
        #         skill_points = {
        #             'phpwebdeveloper': 3,
        #             'Java': 3,
        #             'SQL': 3,
        #             # Add more skills and their respective points here
        #         }
        #         total_points = sum(skill_points.get(skill, 0) for skill in skills)
        #         return total_points
        #     return 0


        # def check_skills(parsed_content):
        #     # Check if 'skills' key exists in parsed_content
        #     if 'skills' in parsed_content:
        #         skills = parsed_content['skills']  # Get the skills list
                
        #         # Define points for each skill dynamically
        #         skill_points_json = {skill: 3 for skill in skills}
              
        #         # Add more skills and their respective points here if needed
                
        #         total_points = sum(skill_points_json.get(skill, 0) for skill in skills)
        #         return total_points
        #     return 0

        def check_skills(parsed_content):
            print("skill_points_json")
            print(skill_points_json)
            # Check if 'skills' key exists in parsed_content
            if 'skills' in parsed_content:
                skills = parsed_content['skills']  # Get the skills list
                
                # Initialize total points
                total_points = 0
                
                # Loop through each skill in the skills list
                for skill in skills:
                    # Check if the skill value matches any value in the skills_json array
                    if skill in skill_points_json:
                        # Allocate 2 points for every matching skill value
                        total_points += 2
                        # Cap the total points at 10 if it exceeds
                        total_points = min(total_points, 20)
                return total_points
            
            # Return 0 if 'skills' key does not exist
            return 0


        # def check_skills(parsed_content,skill_points_json):
        #     print("skill_points_json")
        #     print(skill_points_json)
        #     # Check if 'skills' key exists in parsed_content
        #     if 'skills' in parsed_content:
        #         skills = parsed_content['skills']  # Get the skills dictionary
                
        #         total_points = 0
        #         # Iterate over the skill points dictionary and add points based on the occurrence of words in skills
        #         for skill, points in skill_points_json.items():
        #             # Count occurrences of the skill word in the skills dictionary
        #             skill_occurrences = sum(1 for word in skills if skill.lower() in word.lower())
        #             total_points += skill_occurrences * points
                
        #         return total_points
        #     return 0


        def check_education(parsed_content):
            education_keywords = ['education','university', 'school', 'higher education', 'diploma', 'degree', 'msc', 'bsc']
            for key in parsed_content:
                if any(re.search(r'\b{}\b'.format(keyword), key, re.IGNORECASE) for keyword in education_keywords):
                    return 20
            return 0


        

        def check_email(parsed_content):
            email_keywords = ['email', 'contact', 'mail', 'mailbox', 'inbox', 'e-address','email_addresses']
            for key in parsed_content:
                if any(re.search(r'\b{}\b'.format(keyword),key, re.IGNORECASE) for keyword in email_keywords):
                  return 20
            return 0


        def check_telephone(parsed_content):
            telephone_keywords = ['telephone', 'mobile', 'tel', 'mobile_numbers', 'call', 'phone', 'cell', 'cellphone', 'contact', 'number', 'mobile phone']
            for key in parsed_content:
                if any(re.search(r'\b{}\b'.format(keyword), key, re.IGNORECASE) for keyword in telephone_keywords):
                    return 20
            return 0
        
        def extract_age(parsed_content):
            # Regular expression pattern to match ages in the format XX years old or XX years
            age_pattern = r'(\b\d{1,2}\b)\s*(?:years?|yrs?|yo)\b'
            matches = re.findall(age_pattern, parsed_content, re.IGNORECASE)
            
            if matches:
                # Assuming the first match is the age
                return int(matches[0])
            else:
                return None   
            
        def calculate_points(parsed_content):
            total_points = 0
            total_points += check_skills(parsed_content)
            total_points += check_education(parsed_content)
            total_points += check_email(parsed_content)
            total_points += check_telephone(parsed_content)
                    # Extract age and assign points based on its presence
            age_text = ' '.join(parsed_content)  # Concatenate parsed content into a single string
            age = extract_age(age_text)
            parsed_content['age'] = age
        
            if age:
                total_points += 10  # Assign 10 points if age is found
            
            return total_points
       
        

        # Calculate points
        points = calculate_points(parsed_content)
        parsed_content['points'] = points
        



        return jsonify(parsed_content)
    except Exception as e:
        return jsonify({'error': str(e)})




if __name__ == '__main__': 
    app.run(debug=True)
