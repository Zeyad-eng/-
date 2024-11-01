const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// إعداد CORS
app.use(cors());
app.use(express.json()); // لتحليل JSON في الجسم

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/videosDB', { useNewUrlParser: true, useUnifiedTopology: true });

// تعريف نموذج الفيديو
const videoSchema = new mongoose.Schema({
    title: String,
    url: String,
    password: String,
});

const Video = mongoose.model('Video', videoSchema);

// الحصول على جميع الفيديوهات
app.get('/videos', async (req, res) => {
    const videos = await Video.find({});
    res.json(videos);
});

// إضافة فيديو جديد
app.post('/videos', async (req, res) => {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.status(201).send('فيديو تمت إضافته!');
});

// حذف فيديو
app.delete('/videos/:id', async (req, res) => {
    await Video.findByIdAndDelete(req.params.id);
    res.send('فيديو تمت إزالته!');
});

// بدء الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
