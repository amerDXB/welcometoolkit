from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# --- Serve Static Files ---
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# --- Main Pages ---

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/bank-comparison')
def bank_comparison():
    return render_template('bank-comparison.html')

@app.route('/cost-of-living')
def cost_of_living():
    return render_template('cost-of-living.html')

@app.route('/cover-letter')
def cover_letter():
    return render_template('cover-letter.html')

@app.route('/cra-benefits')
def cra_benefits():
    return render_template('cra-benefits.html')

@app.route('/credential-assessment')
def credential_assessment():
    return render_template('credential-assessment.html')

@app.route('/document-checklist')
def document_checklist():
    return render_template('document-checklist.html')

@app.route('/drivers-license-guide')
def drivers_license_guide():
    return render_template('drivers-license-guide.html')

@app.route('/healthcare-eligibility')
def healthcare_eligibility():
    return render_template('healthcare-eligibility.html')

@app.route('/housing-tips')
def housing_tips():
    return render_template('housing-tips.html')

@app.route('/language-learning')
def language_learning():
    return render_template('language-learning.html')

@app.route('/metric-imperial-converter')
def metric_imperial_converter():
    return render_template('metric-imperial-converter.html')

@app.route('/mobile-plan-comparison')
def mobile_plan_comparison():
    return render_template('mobile-plan-comparison.html')

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy-policy.html')

@app.route('/public-transit')
def public_transit():
    return render_template('public-transit.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/resume-builder')
def resume_builder():
    return render_template('resume-builder.html')

@app.route('/salary-calculator')
def salary_calculator():
    return render_template('salary_calculator.html')

@app.route('/starting-business')
def starting_business():
    return render_template('starting-business.html')

@app.route('/transit-routes')
def transit_routes():
    return render_template('transit-routes.html')

@app.route('/test-logo')
def test_logo():
    return render_template('test-logo.html')

# --- Visitor Counter ---
@app.route('/visitor-counter')
def visitor_counter():
    try:
        with open('visitor_count.txt', 'r+') as f:
            count = int(f.read().strip() or '0')
            count += 1
            f.seek(0)
            f.write(str(count))
            f.truncate()
        return {'count': count}
    except Exception as e:
        return {'error': str(e)}, 500

# --- Run App (Only for Testing) ---
if __name__ == '__main__':
    app.run()
