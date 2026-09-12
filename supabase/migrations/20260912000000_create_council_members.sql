-- Create council_members table
CREATE TABLE council_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    faction_id UUID REFERENCES factions(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create council_member_committees junction table
-- 議員は複数の委員会に所属しうるため多対多で持つ
CREATE TABLE council_member_committees (
    council_member_id UUID NOT NULL REFERENCES council_members(id) ON DELETE CASCADE,
    committee_id UUID NOT NULL REFERENCES committees(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (council_member_id, committee_id)
);

CREATE INDEX idx_council_members_faction_id ON council_members(faction_id);
CREATE INDEX idx_council_member_committees_committee_id ON council_member_committees(committee_id);

-- Create trigger for council_members updated_at
CREATE TRIGGER update_council_members_updated_at BEFORE UPDATE ON council_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE council_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE council_member_committees ENABLE ROW LEVEL SECURITY;

-- No policies are created, so all access is denied by default
-- Access will only be possible using Supabase Service Role Key from server-side

-- Add comments for documentation
COMMENT ON TABLE council_members IS 'Master table for council members (議員)';
COMMENT ON COLUMN council_members.name IS 'Member name';
COMMENT ON COLUMN council_members.faction_id IS 'Faction the member belongs to';
COMMENT ON COLUMN council_members.is_active IS 'Whether the member is currently active';
COMMENT ON COLUMN council_members.sort_order IS 'Display order';

COMMENT ON TABLE council_member_committees IS 'Junction table for council members and committees (所属委員会)';
COMMENT ON COLUMN council_member_committees.council_member_id IS 'Council member ID';
COMMENT ON COLUMN council_member_committees.committee_id IS 'Committee ID';
