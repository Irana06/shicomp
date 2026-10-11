<?php

namespace Tests\Feature;

use Tests\TestCase;

class SeoTest extends TestCase
{
    public function test_sitemap_lists_the_public_pages()
    {
        $this->get('/sitemap.xml')
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml')
            ->assertSee('<loc>'.route('home').'</loc>', false)
            ->assertSee('<loc>'.route('project-status').'</loc>', false);
    }

    public function test_robots_points_to_the_sitemap_and_keeps_admin_out()
    {
        $this->get('/robots.txt')
            ->assertOk()
            ->assertSee('Sitemap: '.route('sitemap'), false)
            ->assertSee('Disallow: /admin', false);
    }
}
