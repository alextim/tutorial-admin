import { useShow, IResourceComponentsProps } from '@pankod/refine-core';
import {
  DateField,
  Divider,
  Show,
  EmailField,
  Card,
  Avatar,
  TagField,
  Title, Text, SimpleGrid
} from '@pankod/refine-mantine';
import { IconBrandFacebook, IconBrandGoogle, IconPhone, IconMail } from '@tabler/icons';

import { IUser } from '../../interfaces';

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card style={{ height: '100%' }}>
              <Avatar size={120} src={record?.avatar?.url} />
              <Title order={3}>
                {record?.firstName} {record?.lastName}
              </Title>

              <Text>
                <IconMail /> <EmailField value={record?.email} />
              </Text>

              {record?.phone && (
                <Text>
                  <IconPhone /> {record?.phone}
                </Text>
              )}

              {record?.googleId && (
                <Text>
                  <IconBrandGoogle /> {record?.googleId}
                </Text>
              )}

              {record?.facebookId && (
                <Text>
                  <IconBrandFacebook /> {record?.facebookId}
                </Text>
              )}
          </Card>
        <div>
          <Title order={5}>Id</Title>
          <Text>{record?.id}</Text>

          <Divider />

          <Title order={5}>Roles</Title>
          <Text>
            {record?.roles.map((role) => (
              <TagField key={role} value={role} />
            ))}
          </Text>

          {record?.isRegisteredWithGoogle && (
            <>
              <Title order={5}>Registered With Google</Title>
              <Text>yes</Text>
            </>
          )}

          {record?.isRegisteredWithFacebook && (
            <>
              <Title order={5}>Registered With Facebook</Title>
              <Text>yes</Text>
            </>
          )}

          {record?.verificationCodeSentAt && (
            <>
              <Title order={5}>Verification Sent At</Title>
              <Text>
                <DateField
                  value={record?.verificationCodeSentAt}
                  format="LLL"
                />
              </Text>
            </>
          )}

          {record?.verifiedAt && (
            <>
              <Title order={5}>Verified At</Title>
              <Text>
                <DateField value={record?.verifiedAt} format="LLL" />
              </Text>
            </>
          )}

          <Divider />

          <Title order={5}>Created At</Title>
          <Text>
            <DateField value={record?.createdAt} format="LLL" />
          </Text>

          <Title order={5}>Updated At</Title>
          <Text>
            <DateField value={record?.updatedAt} format="LLL" />
          </Text>
        </div>
      </SimpleGrid>
    </Show>
  );
};
