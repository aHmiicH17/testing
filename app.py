# from flask import Flask, render_template, request, redirect, url_for, session, flash
# from datetime import datetime
# from werkzeug.security import generate_password_hash, check_password_hash


# app = Flask(__name__)
# app.secret_key = 'your-secret-key'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False





# # Dashboard Route
# @app.route('/')
# def dashboard():
#     return render_template('dashboard.html')

# # Settings Route
# @app.route('/setting', methods=['GET', 'POST'])
# def setting():
#     if request.method == 'POST':
#         # Logic to update user settings can go here
#         pass
#     return render_template('setting.html')



# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, render_template, request, redirect, url_for, flash, session
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create "result_output" directory if it doesn't exist
# UPLOAD_FOLDER = 'result_output'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Dashboard Route
@app.route('/')
def dashboard():
    return render_template('dashboard.html')



# Route to handle audio file upload
@app.route('/audio', methods=['POST'])
def audio():
    if 'audio_file' not in request.files:
        flash('No audio file part')
        return redirect(url_for('dashboard'))

    audio_file = request.files['audio_file']
    if audio_file.filename == '':
        flash('No selected audio file')
        return redirect(url_for('dashboard'))

    if audio_file:
        filename = secure_filename(audio_file.filename)
        audio_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Audio file uploaded successfully')
        return redirect(url_for('dashboard'))

# Route to handle video file upload
@app.route('/video', methods=['POST'])
def video():
    if 'video_file' not in request.files:
        flash('No video file part')
        return redirect(url_for('dashboard'))

    video_file = request.files['video_file']
    if video_file.filename == '':
        flash('No selected video file')
        return redirect(url_for('dashboard'))

    if video_file:
        filename = secure_filename(video_file.filename)
        video_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Video file uploaded successfully')
        return redirect(url_for('dashboard'))


# Route to start the lip-sync process
@app.route('/start_lipsync', methods=['POST'])
def start_lipsync():
    # Assuming process_lipsync() is your function that processes the files
    # Save the result as "result.mp4" in the UPLOAD_FOLDER
    result_video_path = os.path.join(app.config['UPLOAD_FOLDER'], 'result.mp4')

    # Here, call your processing function and save the output as "result.mp4"
    # Example: process_lipsync(input_audio, input_video, result_video_path)
    # For now, we assume "result.mp4" is created after processing

    if os.path.exists(result_video_path):
        flash('Video processed successfully')
        return render_template('dashboard.html', result_video='result.mp4')
    else:
        flash('Error in processing video')
        return redirect(url_for('dashboard'))

# Route to download the processed video
@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)


# Settings Route
@app.route('/setting', methods=['GET', 'POST'])
def setting():
    if request.method == 'POST':
        # Logic to update user settings can go here
        pass
    return render_template('setting.html')

if __name__ == '__main__':
    app.run(debug=True)
