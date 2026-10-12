-- ==============================================================================
-- Schema Migration: Work Experiences Table & RLS Policies
-- ==============================================================================

-- 1. CREATE EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    employment_type TEXT, -- e.g., 'Full-time', 'Contract', 'Internship'
    location TEXT,        -- e.g., 'Jakarta, Indonesia'
    start_date TEXT NOT NULL,
    end_date TEXT,        -- e.g., 'Present' or 'Nov 2025'
    description TEXT,
    responsibilities TEXT[] NOT NULL DEFAULT '{}',
    technologies TEXT[] NOT NULL DEFAULT '{}',
    logo_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for visible experiences ordering
CREATE INDEX IF NOT EXISTS idx_experiences_visible_order 
    ON public.experiences(is_visible, display_order);

-- Apply updated_at trigger
DROP TRIGGER IF EXISTS set_experiences_updated_at ON public.experiences;
CREATE TRIGGER set_experiences_updated_at
    BEFORE UPDATE ON public.experiences
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 2. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Allow public read access to visible experiences
CREATE POLICY "Allow public read visible experiences"
    ON public.experiences
    FOR SELECT
    USING (is_visible = true OR auth.role() = 'authenticated');

-- Allow authenticated users (admin) full access to experiences
CREATE POLICY "Allow authenticated users all access on experiences"
    ON public.experiences
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. SEED INITIAL WORK EXPERIENCES
INSERT INTO public.experiences (
    id,
    company,
    role,
    employment_type,
    location,
    start_date,
    end_date,
    description,
    responsibilities,
    technologies,
    display_order,
    is_visible
) VALUES
(
    '00000000-0000-0000-0000-000000000201',
    'PT Mobil Anak Bangsa',
    'Programmer / Software Engineer',
    'Full-time',
    'Jakarta, Indonesia',
    'Dec 2025',
    'Present',
    'Leading end-to-end development of internal enterprise systems and managing cloud server infrastructure.',
    ARRAY[
        'End-to-End System Development: Spearheaded the end-to-end development of PRO-MIS (Portal Management Internal System) as a solo developer, driving the full software lifecycle from system design and architecture to coding and deployment.',
        'AI-Assisted Engineering: Leveraged AI agents (Google Antigravity IDE) to accelerate development workflows, optimize code quality, and efficiently architect complex internal systems.',
        'Cloud Infrastructure Management: Administered and managed the company''s cloud server infrastructure to ensure optimal performance, security, and high availability for internal web applications.',
        'Financial & Budget Systems: Engineered an Accounting module to consolidate financial reports across MABI Group subsidiaries by bridging multiple disparate Accurate databases. Developed a Finance & Budget Control module to track annual departmental budgets and monitor cost realization linked to Purchase Requests (PR).',
        'Operational Tracking Solutions: Built an After-Sales Service module for comprehensive unit reporting, enabling real-time recording, tracking, and monitoring of unit damages, adjustments, and maintenance requests.'
    ],
    ARRAY['PHP', 'Laravel', 'PostgreSQL', 'Windows Server', 'Cloud Infrastructure', 'Google Antigravity IDE', 'Accurate DB'],
    1,
    true
),
(
    '00000000-0000-0000-0000-000000000202',
    'PT Asta Protek Jiarsi',
    'Programmer',
    'Contract',
    'Tangerang, Indonesia',
    'Jan 2024',
    'Nov 2025',
    'Development and maintenance of banking compliance and data integration applications.',
    ARRAY[
        'Developed and maintained Anti Money Laundering (AML) applications using Laravel & PostgreSQL.',
        'Rewrote AML applications from Laravel using Vue.js & Node.js for enhanced modern architecture.',
        'Implemented ETL processes using Pentaho Data Integration for data transfer across enterprise systems.',
        'Improved system performance and stability through bug fixing and database query optimization.',
        'Created technical documentation for ETL pipelines and data transformation workflows.'
    ],
    ARRAY['Laravel', 'PostgreSQL', 'Vue.js', 'Node.js', 'Pentaho Data Integration', 'ETL'],
    2,
    true
),
(
    '00000000-0000-0000-0000-000000000203',
    'PT Asta Protek Jiarsi',
    'PHP Programmer',
    'Internship',
    'Tangerang, Indonesia',
    'Aug 2023',
    'Dec 2023',
    'Development of banking reporting and self-service internal applications.',
    ARRAY[
        'Developed Central Bank Reporting (CBR) web applications using Laravel.',
        'Developed Employee Self Service (ESS) systems for web (Laravel) and mobile (Flutter).',
        'Analyzed and resolved bugs while ensuring system stability and high code quality.',
        'Created comprehensive documentation for database queries and user operational guides.'
    ],
    ARRAY['PHP', 'Laravel', 'Flutter', 'MySQL', 'REST API'],
    3,
    true
)
ON CONFLICT (id) DO NOTHING;
