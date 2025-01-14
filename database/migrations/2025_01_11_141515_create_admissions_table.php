<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('user_id')->nullable();
            $table->string('reg_id');
            $table->string('sector_id');
            $table->string('year_id');
            $table->string('form_no');
            $table->string('father_name')->nullable();
            $table->string('birth_day')->nullable();
            $table->string('phone')->nullable();
            $table->string('birth_no')->nullable();
            $table->string('nid_no')->nullable();
            $table->string('village')->nullable();
            $table->string('post')->nullable();
            $table->string('thana')->nullable();
            $table->string('zila')->nullable();
            $table->string('phone_2')->nullable();
            $table->string('phone_3')->nullable();
            $table->string('status')->default(STATUS_ACTIVE);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
