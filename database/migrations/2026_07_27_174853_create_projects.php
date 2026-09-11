<?php

use App\Enums\PaymentStatusEnum;
use App\Enums\StatusEnum;
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
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('project_code')->unique();
            $table->string('title');
            $table->text('brief')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->enum('status', StatusEnum::values())->default(StatusEnum::Pending->value);
            $table->enum('payment_status', PaymentStatusEnum::values())->default(PaymentStatusEnum::Unpaid->value);

            // Order history must survive: deleting a user keeps the project, and a
            // product that has projects cannot be deleted (unpublish it instead).
            $table->foreignUuid('user_id')->nullable()->constrained()->nullOnDelete(); // null = guest order
            $table->foreignUuid('product_id')->nullable()->constrained()->restrictOnDelete(); // null = custom project
            $table->string('guest_name')->nullable();
            $table->string('guest_email')->nullable();
            $table->string('guest_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
