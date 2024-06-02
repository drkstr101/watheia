import clsx from 'clsx';

function Office({
  name,
  children,
  invert = false,
}: {
  name: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <address
      className={clsx('text-sm not-italic', invert ? 'text-neutral-300' : 'text-neutral-600')}
    >
      <strong className={invert ? 'text-white' : 'text-black'}>{name}</strong>
      <br />
      {children}
    </address>
  );
}

export function OtherSites({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul {...props}>
      <li>
        <Office name="Dashboard" invert={invert}>
          Client projects &amp;
          <br /> user settings
        </Office>
      </li>
      <li>
        <Office name="Documentation" invert={invert}>
          555 Any St.
          <br />
          Spokane, WA
        </Office>
      </li>
    </ul>
  );
}
