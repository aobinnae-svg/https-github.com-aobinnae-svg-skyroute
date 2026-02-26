/*
  # NaijaGuide Database Schema

  ## Overview
  Creates the core schema for the NaijaGuide travel application, enabling users to explore Nigerian destinations, attractions, and reviews.

  ## New Tables

  ### `states`
  - `id` (uuid, primary key) - Unique identifier for each Nigerian state
  - `name` (text, unique, not null) - State name (e.g., "Lagos", "Abuja")
  - `slug` (text, unique, not null) - URL-friendly version of the name
  - `description` (text) - Brief description of the state
  - `region` (text, not null) - Geopolitical zone (e.g., "South West", "North Central")
  - `image_url` (text) - Featured image URL
  - `population` (integer) - Estimated population
  - `created_at` (timestamptz) - Record creation timestamp

  ### `destinations`
  - `id` (uuid, primary key) - Unique identifier for each destination
  - `state_id` (uuid, foreign key) - Reference to the state
  - `name` (text, not null) - Destination name
  - `slug` (text, unique, not null) - URL-friendly version of the name
  - `description` (text) - Detailed description
  - `short_description` (text) - Brief summary for cards
  - `category` (text, not null) - Type (e.g., "Beach", "Mountain", "Historical Site", "City")
  - `image_url` (text) - Featured image URL
  - `location` (text) - Specific location details
  - `best_time_to_visit` (text) - Recommended visiting period
  - `average_cost` (text) - Cost estimate
  - `rating` (numeric, default 0) - Average rating (0-5)
  - `views_count` (integer, default 0) - Number of views
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `attractions`
  - `id` (uuid, primary key) - Unique identifier for each attraction
  - `destination_id` (uuid, foreign key) - Reference to the destination
  - `name` (text, not null) - Attraction name
  - `description` (text) - Detailed description
  - `type` (text, not null) - Attraction type (e.g., "Museum", "Park", "Restaurant")
  - `location` (text) - Specific location
  - `opening_hours` (text) - Operating hours
  - `entry_fee` (text) - Admission cost
  - `image_url` (text) - Featured image URL
  - `created_at` (timestamptz) - Record creation timestamp

  ### `reviews`
  - `id` (uuid, primary key) - Unique identifier for each review
  - `destination_id` (uuid, foreign key) - Reference to the destination
  - `author_name` (text, not null) - Reviewer name
  - `rating` (integer, not null) - Rating (1-5)
  - `title` (text) - Review title
  - `content` (text, not null) - Review text
  - `visit_date` (date) - Date of visit
  - `helpful_count` (integer, default 0) - Number of helpful votes
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security

  1. Row Level Security (RLS) is enabled on all tables
  2. All tables have public read access (SELECT)
  3. Write operations (INSERT, UPDATE, DELETE) are restricted for future authentication implementation

  ## Indexes

  - Created indexes on frequently queried columns for optimal performance
  - Slug columns indexed for fast lookups
  - Foreign keys automatically indexed
*/

-- Create states table
CREATE TABLE IF NOT EXISTS states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  region text NOT NULL,
  image_url text,
  population integer,
  created_at timestamptz DEFAULT now()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id uuid REFERENCES states(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  category text NOT NULL,
  image_url text,
  location text,
  best_time_to_visit text,
  average_cost text,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attractions table
CREATE TABLE IF NOT EXISTS attractions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type text NOT NULL,
  location text,
  opening_hours text,
  entry_fee text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid REFERENCES destinations(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text NOT NULL,
  visit_date date,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_destinations_state_id ON destinations(state_id);
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);
CREATE INDEX IF NOT EXISTS idx_destinations_category ON destinations(category);
CREATE INDEX IF NOT EXISTS idx_destinations_rating ON destinations(rating DESC);
CREATE INDEX IF NOT EXISTS idx_attractions_destination_id ON attractions(destination_id);
CREATE INDEX IF NOT EXISTS idx_reviews_destination_id ON reviews(destination_id);
CREATE INDEX IF NOT EXISTS idx_states_slug ON states(slug);

-- Enable Row Level Security
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for states"
  ON states FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for destinations"
  ON destinations FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for attractions"
  ON attractions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public read access for reviews"
  ON reviews FOR SELECT
  TO anon
  USING (true);

-- Insert sample data for Nigerian states
INSERT INTO states (name, slug, description, region, population) VALUES
('Lagos', 'lagos', 'Nigeria''s commercial capital and most populous city, known for its vibrant culture, beaches, and bustling economy.', 'South West', 15000000),
('Abuja', 'abuja', 'The federal capital territory, featuring modern architecture, government buildings, and beautiful landscapes.', 'North Central', 3500000),
('Kano', 'kano', 'Ancient city with rich history, known for its traditional markets, Islamic culture, and historic sites.', 'North West', 4000000),
('Rivers', 'rivers', 'Oil-rich state with Port Harcourt as its capital, featuring diverse cultures and waterways.', 'South South', 7000000),
('Oyo', 'oyo', 'Home to Ibadan, one of Nigeria''s oldest cities, rich in Yoruba culture and historical significance.', 'South West', 6000000)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample destinations
INSERT INTO destinations (state_id, name, slug, description, short_description, category, location, best_time_to_visit, average_cost) 
SELECT 
  s.id,
  'Lekki Conservation Centre',
  'lekki-conservation-centre',
  'A 78-hectare nature park located in Lekki, Lagos. Features Nigeria''s longest canopy walkway, diverse wildlife, and serene natural environment perfect for nature lovers and families.',
  'Nature reserve with canopy walkway and diverse wildlife in Lagos',
  'Nature Reserve',
  'Lekki Peninsula, Lagos',
  'November to March (dry season)',
  'NGN 1,000 - 2,000 per person'
FROM states s WHERE s.slug = 'lagos'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO destinations (state_id, name, slug, description, short_description, category, location, best_time_to_visit, average_cost)
SELECT 
  s.id,
  'Aso Rock',
  'aso-rock',
  'A large outcrop that dominates Abuja''s landscape and serves as the backdrop to the Nigerian Presidential Complex. This 400-meter monolith is an iconic symbol of Nigeria''s political center.',
  'Iconic monolith and symbol of Nigeria''s capital city',
  'Landmark',
  'Central Abuja, FCT',
  'Year-round',
  'Free (viewing from public areas)'
FROM states s WHERE s.slug = 'abuja'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO destinations (state_id, name, slug, description, short_description, category, location, best_time_to_visit, average_cost)
SELECT 
  s.id,
  'Kano City Walls',
  'kano-city-walls',
  'Ancient defensive walls built between 1095 and 1134 AD, stretching over 14 kilometers. These historic fortifications represent one of Africa''s most impressive medieval structures.',
  'Historic 14km medieval city walls and fortifications',
  'Historical Site',
  'Old City, Kano',
  'November to February',
  'NGN 500 - 1,000'
FROM states s WHERE s.slug = 'kano'
ON CONFLICT (slug) DO NOTHING;
