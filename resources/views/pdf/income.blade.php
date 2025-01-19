<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ভর্তি রশিদ</title>
    <style>
        .mt-30 {
            margin-top: 30px;
        }
        .title-section {
            margin-left: 100px;
            margin-right: 100px;
        }

        .title {
            background-color: #000;
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 30px;
            color: #fff;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
        }

        table {
            border: 1px solid #cbd5e1;
            width: 100%;
           
        }

        .border {
            border-bottom: 1px solid #cbd5e1;
           padding-top: 10px;
           padding-bottom: 10px;
           padding-left: 10px;
           font-size: 18px;
           
        }
        .border-right {
            border-right: 1px solid #cbd5e1;
        }
        .border-b-0 {
            border-bottom: 0 !important;
        }

        .signature-section {
            float: left;
        }

        .footer-table {
            padding-top: 60px;
            border: 0;
        }
    </style>
</head>
<body>

    <div class="header">
        <img src="{{ asset('images/page-title.png') }}" alt="page title">
    </div>

    <!-- Title Section -->
    <div class="title-section">
        <p class="title">টাকা আদায়ের রশিদ</p>
    </div>

    <table cellspacing="0" cellpadding="0" border="#000">
        <tr>
            <td class="border border-right">ছাত্রের নাম</td>
            <td class="border">{{ $income->admission->name }}</td>
        </tr>
        <tr>
            <td class="border border-right">পিতার নাম</td>
            <td class="border">{{ $income->admission->father_name }}</td>
        </tr>
        <tr>
            <td class="border border-right">দাখেলা / রেজিস্ট্রেশন নং</td>
            <td class="border">{{ $income->admission->reg_id }}</td>
        </tr>
        <tr>
            <td class="border border-right">শ্রেণী / বর্ষ</td>
            <td class="border">{{ $income->sector->sector }}</td>
        </tr>
        <tr>
            <td class="border border-right">টাকার পরিমাণ</td>
            <td class="border">{{ $income->amount }}</td>
        </tr>
        <tr>
            <td class="border border-right">বাবদ</td>
            <td class="border">{{ $income->income_sector->name }}</td>
        </tr>
        <tr>
            <td class="border border-right">গ্রহিতা</td>
            <td class="border">{{ $income->user->name }}</td>
        </tr>
        <tr>
            <td class="border border-b-0 border-right">আদায়ের তারিখ ও সময়</td>
            <td class="border border-b-0">{{ $income->created_at->format('d-F-Y, h:i A') }}</td>
        </tr>
    </table>

    <!-- Footer Section -->
    <div class="footer-section">
        <p class="footer-text">দয়া করে দাখেলা বা রেজিস্ট্রেশন নাম্বারটি সংগ্রহে রাখবেন, পরবর্তিতে লেনদেন বা অন্য অনেক কাজে এটি প্রয়োজন হতে পারে।</p>
    </div>


    <!-- Signature Section -->
    <table class="footer-table" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td>
                <div class="signature">
                    <span>_______________</span>
                    <span class="font-semibold">আদায়কারির স্বাক্ষর</span>
                </div>
            </td>
            <td>
                <div class="signature">
                    <span>_______________</span>
                    <span class="font-semibold">মুহতামিমের স্বাক্ষর</span>
                </div>
            </td>
        </tr>
    </table>
    
</body>
</html>
